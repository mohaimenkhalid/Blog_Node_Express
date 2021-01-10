const Flash = require('../utiles/Flash')

exports.dashboardGetController = (req, res, next) => {
     res.render('pages/dashboard/dashboard', {
          title: 'My Dashboard',
          flashMessage: Flash.getMessage(req)
     })
}