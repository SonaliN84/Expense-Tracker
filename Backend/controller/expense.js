const Expense = require("../models/expense");
const sequelize = require("../util/database");
const AWS = require("aws-sdk");
const DownloadFile = require("../models/downloadfile");

function isStringInValid(string) {
  if (string === undefined || string === null || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.postAddExpense = async (req, res, next) => {
  try {
    const t = await sequelize.transaction();
    const amount = req.body.amount;
    const description = req.body.description;
    const category = req.body.category;

    if (
      isStringInValid(description) ||
      isStringInValid(category) ||
      amount == undefined ||
      amount === null ||
      amount < 0
    ) {
      return res.status(400).json({ err: "Bad parameters" });
    }

    const expense = await req.user.createExpense(
      {
        amount: amount,
        description: description,
        category: category,
      },
      { transaction: t }
    );
    await req.user.update(
      {
        totalexpense: req.user.totalexpense + Number.parseInt(amount),
      },
      { transaction: t }
    );

    await t.commit();

    return res.status(201).json(expense);
  } catch (err) {
    console.log(err);
    await t.rollback();
    return res.status(500).json({ error: err, success: false });
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    console.log(page);
    let size = parseInt(req.query.size);
    console.log(size);
    //    const total=await req.user.countExpenses();
    const total = await Expense.count({ where: { userId: req.user.id } });
    //    const offset=Math.max(total-page*size,0);
    let offset = total - page * size;
    console.log("offset", offset);
    let limit = size;
    if (offset < 0) {
      offset = 0;
      limit = total - (page - 1) * size;
    }
    console.log("new offset", offset);
    const expenses = await req.user.getExpenses({ offset, limit });
    return res.status(200).json({ expenses, total, page, size });
  } catch (err) {
    return res.status(500).json({ error: err, success: false });
  }
};

exports.deleteExpense = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const expenseId = req.params.expenseId;

    if (expenseId == undefined || expenseId.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Bad parameters" });
    }

    const expenses = await req.user.getExpenses(
      { where: { id: expenseId } },
      { transaction: t }
    );
    const expense = expenses[0];
    expense.destroy();

    await req.user.update(
      {
        totalexpense: req.user.totalexpense - expense.amount,
      },
      { transaction: t }
    );

    await t.commit();
    return res
      .status(200)
      .json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    await t.rollback();
    return res.status(500).json({ error: err, success: false });
  }
};

const uploadToS3 = (data, filename) => {
  const BUCKET_NAME = process.env.AWS_IAM_BUCKET_NAME;
  const IAM_USER_KEY = process.env.AWS_IAM_ACCESS_KEY;
  const IAM_USER_SECRET = process.env.AWS_IAM_SECRET_KEY;

  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
  });

  var params = {
    Bucket: BUCKET_NAME,
    Key: filename,
    Body: data,
    ACL: "public-read",
  };

  return new Promise((resolve, reject) => {
    s3bucket.upload(params, (err, s3response) => {
      if (err) {
        console.log("Something went wrong", err);
        reject("Something went wrong");
      } else {
        console.log("success", s3response);
        console.log(s3response.Location);
        resolve(s3response.Location);
      }
    });
  });
};

exports.getDownloadExpense = async (req, res, next) => {
  try {
    const expenses = await req.user.getExpenses();
    console.log(expenses);

    const userId = req.user.id;
    const stringifiedExpenses = JSON.stringify(expenses);

    const filename = `Expense${userId}/${new Date()}.txt`;

    const fileURL = await uploadToS3(stringifiedExpenses, filename);
    console.log(">>>>>>>", fileURL);
    req.user.createDownloadfile({ fileURL });
    res.status(200).json({ file: fileURL, message: "done", success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ file: "", success: false, error: err });
  }
};

exports.getDownloadHistory = async (req, res, next) => {
  const downloadHistory = await req.user.getDownloadfiles();
  res.status(200).json(downloadHistory);
};
