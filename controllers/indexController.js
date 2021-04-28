class IndexController{
    
    index(req, res){
        res.render("index.ejs")
    }
    hmoePageInfo(req, res){
        res.json({userInfo: req.user})
    }
}

module.exports = new IndexController()