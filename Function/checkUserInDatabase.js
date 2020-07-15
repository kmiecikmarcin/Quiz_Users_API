function userLogIn()
{
    const question = {
        questionData: "Select id_user,id_role from users where user_name=($1) AND user_password=($2)",
    }
    return question.questionData;
}

function takeData(userName,userPassword)
{
    const values = 
    {
        valuesData: [userName,userPassword]
    }
    return values.valuesData
}

module.exports.userLogIn = userLogIn;
module.exports.takeData = takeData;