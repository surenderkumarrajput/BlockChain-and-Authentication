let DataArray=[new account("monu",12345)]; //Array holding Data

 //Function which creates user
function createUser(user,pass)
{
    let data=new account(user,pass);
    addToDatabase(data);
}

//Function which adds user to database
function addToDatabase(account)
{
DataArray.push(account);
}

//Login function
function login(user,pass)
{
    return new Promise((resolve,reject)=>{
    let right=false;
        for (let index = 0; index < DataArray.length; index++) {
            if(user==DataArray[index].user && pass==DataArray[index].password)
            {
                right=true;
            }
        }
    if(right)
    {
     resolve("Logged in as "+user);
     right=false;
    }
    else{
        reject("Failed to Login");
    }
})
}

//Validation Function
async function validation(user,pass)
{
    try{
        const result= await login(user,pass);
        console.log(result);
    }catch(msg){
        console.log(msg);
    }
}



