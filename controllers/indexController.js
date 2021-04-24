class IndexController{
    
    index(req, res){
        res.render("index.ejs")
    }
}

module.exports = new IndexController()