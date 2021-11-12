const fs = require('fs')
const path = 'data.json'

let data = JSON.parse(fs.readFileSync(path, 'utf8'))

exports.create = function (request, response)
{
    let person = request.url.split('/')[1]
    if (person === '')
        response.send("Empty person name")
    else
    {
        data.cooks.push(person)
        fs.writeFileSync(path, JSON.stringify(person))
        response.send(person + " was added")
    }
}

exports.read = function (response)
{
    let size = Object.keys(data.cooks).length
    let output = "Cooks: "

    for (let i = 0; i < size; ++i)
        output += data.cooks[i] + " "
    response.send(output + "<br />")
}

exports.update = function (request, response)
{
    let params = request.url.split('/');
    let id = parseInt(params[1]);
    let newName = params[2];
    let size = Object.keys(data.cooks).length;

    if (!Number.isSafeInteger(id) || id < 0 || id >= size)
        response.send("Invalid id");
    else
    {
        let oldName = data.cooks[id];
        data.cooks[id] = newName;
        fs.writeFileSync(path, JSON.stringify(data));
        response.send("The cook with the index " + id +"changed the name from " + oldName + " to " + newName);
    }
}

exports.delete = function (request, response)
{
    let size = Object.keys(data.cooks).length;
    let id = parseInt(request.url.split("/")[1]);

    if (!Number.isSafeInteger(id) || id < 0 || id >= size)
        response.send("Invalid id");
    else
    {
        data.cooks.splice(id, 1);
        fs.writeFileSync(path, JSON.stringify(data));
        response.send("Removed cook number " + id);
    }
}