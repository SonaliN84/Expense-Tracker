const User = require("../models/user");


exports.getLeaderboard = async (req, res, next) => {
  // const expenses=await Expense.findAll({include:[{model:User,attributes:["name"]}],attributes:["userid", [sequelize.fn("SUM", sequelize.col("amount")), "expenseSum"]],group:"userid"})

  // console.log(JSON.stringify(expenses, null, 2))

  // res.status(200).json(expenses)

  // try{
  //     const leaderboardofusers=await User.findAll({
  //         attributes:['id','name',[sequelize.fn('sum',sequelize.col('expenses.amount')),'total_amount']],
  //         include:[
  //             {
  //                 model:Expense,
  //                 attributes:[]
  //             }
  //         ],
  //         group:['users.id'],
  //         order:[['total_amount','DESC']]
  //     })
  //     console.log("hello",leaderboardofusers)
  //     res.status(200).json(leaderboardofusers)
  // }
  // catch(err){

  //     console.log(err)
  // }
  try {
    const leaderboardofusers = await User.findAll({
      attributes: ["name", "totalexpense"],
      order: [["totalexpense", "DESC"]],
    });
    res.status(200).json(leaderboardofusers);
  } catch (err) {
    res.status(500).json(err);
  }
};
