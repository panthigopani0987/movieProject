const CrudTbl = require('../models/CrudTbl');
const fs = require('fs');
const index = async (req, res) => {
    try {
        let user = await CrudTbl.find({});
        if (user) {
            return res.render('form', {
                user,
                single: "",
            });
        } else {
            console.log("Record not fetch");
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}
const addRecord = async (req, res) => {
    try {
        const { name, director, writer, actors, language, country, type } = req.body;
        let editId = req.body.editid;
        if (editId) {
            if (req.file) {
                if (!name || !director || !writer || !actors || !language || !country || !type) {
                    console.log("plese all field fill");
                    return res.redirect('back');
                }
                //old image unlink
                let deleteRecord = await CrudTbl.findById(editId);
                if (deleteRecord) {
                    fs.unlinkSync(deleteRecord.avatar);
                } else {
                    console.log("file not unlink");
                    return res.redirect('back');
                }
                //old image unlink

                //new image upload in folder
                let image = "";
                if (req.file) {
                    image = req.file.path;
                }
                //new image upload in folder

                let updateRecord = await CrudTbl.findByIdAndUpdate(editId, {
                    name: name,
                    director: director,
                    writer: writer,
                    actors: actors,
                    language: language,
                    country: country,
                    type: type,
                    avatar: image
                })
                if (updateRecord) {
                    console.log("record successfully update");
                    return res.redirect('/');
                } else {
                    console.log("record not successfully  update");
                    return res.redirect('/');
                }
            } else {
                let image = "";
                let singleRecord = await CrudTbl.findById(editId);
                if (singleRecord) {
                    image = singleRecord.avatar;
                    let updatedata = await CrudTbl.findByIdAndUpdate(editId, {
                        name: name,
                        director: director,
                        writer: writer,
                        actors: actors,
                        language: language,
                        country: country,
                        type: type,
                        avatar: image
                    })
                    if (updatedata) {
                        console.log("Record successfully update");
                        return res.redirect('/');
                    } else {
                        console.log("Record not successfully update");
                        return res.redirect('/');
                    }
                } else {
                    console.log("Record not fetch");
                    return res.redirect('/');
                }
            }
        } else {
            if (!name || !director || !writer || !actors || !language || !country || !type) {
                console.log("plese all field fill");
                return res.redirect('back');
            }
            let image = "";
            if (req.file) {
                image = req.file.path;
            }
            let data = await CrudTbl.create({
                name: name,
                director: director,
                writer: writer,
                actors: actors,
                language: language,
                country: country,
                type: type,
                avatar: image
            })
            if (data) {
                console.log("Record successfully insert");
                return res.redirect('back');
            } else {
                console.log(err);
                return res.redirect('back');
            }
        }
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }
}
const deleteData = async (req, res) => {
    try {
        let id = req.query.id;
        // file unlink start
        let deleteRecord = await CrudTbl.findById(id);
        if (deleteRecord) {
            fs.unlinkSync(deleteRecord.avatar);
        } else {
            console.log("Record not delete");
            return res.redirect("/");
        }
        let data = await CrudTbl.findByIdAndDelete(id);
        if (data) {
            console.log("Record successfully delete");
            return res.redirect("back");
        } else {
            console.log("Record not delete");
            return res.redirect("back");
        }
    } catch (err) {
        console.log(err);
        return res.redirect("/");
    }
};

const editData = async (req, res) => {
    try {
        let id = req.query.id;
        let alldata = await CrudTbl.find({});
        let single = await CrudTbl.findById(id);
        if (single) {
            return res.render('form', {
                single,
                user: alldata
            })
        } else {
            console.log("record not fetch");
            return res.redirect('/');
        }
    } catch (err) {
        console.log(err);
        return res.redirect('/');
    }
}
module.exports = {
    index,
    addRecord,
    deleteData,
    editData
}