const Transaction = require('../models/transaction');

exports.addTransaction = (req, res, next) => {
  const trans = new Transaction({
    name: req.body.name,
    amount: req.body.amount,
    transType: req.body.transType,
    date: req.body.date,
    comments: req.body.comments
  });
  trans.save()
  .then(result => {
    res.status(202).json({
      message: 'Transaction added Successfully !',
      trans: result
    })
  })
  .catch(err => {
    console.log(error);
  })
}

exports.getAllTransactions = (req, res, next) => {
  Transaction.find()
  .then(transactions => {
    res.status(200).json({
      transactions: transactions,
      message: 'Transactions fetched successfully'
    })
  })
  .catch(error => {
    console.log(error);
    res.status(404).json({
      message: 'Fetching of transactions failed !!'
    })
  })
}

exports.deleteTrans = (req, res, next) => {
  let transactionId = req.body.transactionId;
  Transaction.deleteOne({_id: transactionId})
  .then(result => {
    if (result.deletedCount === 1) {
      return Transaction.find();
    }
    return res.status(404).json({
      message: 'Transaction does not exist or could not be deleted successfully !!'
    })
  })
  .then(data => {
    res.status(200).json({
      message: 'Transaction deleted successfully !',
      transactions: data
    })
  })
  .catch(error => {
    console.log(error);
    res.status(404).json({
      message: 'An error occured while removing transaction !!. PLease check the response for more details !!'
    })
  })
}
