function userLogIn()
{
    const question = {
        questionData: "Select id_user,id_role from users where user_name=($1) AND user_password=($2)",
    }
    return question.questionData;
}

function addUserToDatabase()
{
    const question = {
        questionData: "Insert into users (id_role,user_name,user_password,email) values (($1),($2),($3),($4))",
    }
    return question.questionData;
}

function takeLoginData(userName,userPassword)
{
    const values = 
    {
        valuesData: [userName,userPassword]
    }
    return values.valuesData
}

function takeDataForRegister(userName,userPassword,email)
{
    const values = 
    {
        valuesData: [1,userName,userPassword,email]
    }
    return values.valuesData
}

module.exports.userLogIn = userLogIn;
module.exports.takeLoginData = takeLoginData;
module.exports.addUserToDatabase = addUserToDatabase;
module.exports.takeDataForRegister = takeDataForRegister;