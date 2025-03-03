
let methods1=[
    {
        method_name:"GET",
        method_description:"List users",
        request_path:`/api/users`,
        request_body:{},
        response_code:200,
        response_body:[
            {
                "id": 35711,
                "userInfo": {
                  "name": "Rana",
                  "job": "board member"
                }
              },
        ]
    },
    {
        method_name:"GET",
        method_description:"Single users",
        request_path:"/api/users/1",
        request_body:{},
        response_code:200,
        response_body:[
            {
                "id": 1,
                "userInfo": {
                  "name": "Simran",
                  "job": "Manager"
                }
              }
        ]
    },
    {
        method_name:"GET",
        method_description:"USER NOT FOUND",
        request_path:"/api/users/5639",
        request_body:{},
        response_code:400,
        response_body:[]
    },
    {
        method_name:"POST",
        method_description:"CREATE USER",
        request_path:"/api/users",
        request_body:{
            "id":33,
            "userInfo":{
                name: "bhaskar",
                job: "manager",
            }
        },
        response_code:201,
        response_body:["USER CREATED"]
    },
    {
        method_name:"PUT",
        method_description:"UPDATE USER",
        request_path:"/api/users",
        request_body:{
            "id": 35711,
            "userInfo": {
              "name": "Rana",
              "job": "board member"
            }
          },
        response_code:201,
        response_body:[
            "USER DETAILS UPDATED CHECK BY GETTING"
        ]
    },
    {
        method_name:"PATCH",
        method_description:"UPDATE USER",
        request_path:"/api/users",
        request_body:{
            "id": 35711,
            "userInfo": {
              "name": "Rana",
              "job": "board member"
            }
          },
        response_code:201,
        response_body:[
            "USER DETAILS UPDATED CHECK BY GETTING"
        ]
    },
    {
        method_name:"DELETE",
        method_description:"DELETE USER",
        request_path:"/api/users/2",
        request_body:{
            name: "Bhaskar",
            job: "watchmen"
        },
        response_code:204,
        response_body:["deleted" ]
    },
    {
        method_name:"POST",
        method_description:"Register - successful",
        request_path:"/api/register",
        request_body:{
            uesrId: "bhaskar@gmail.com",
            password: "watchmen"
        },
        response_code:200,
        response_body:["USER REGISTERED"]
    },
    {
        method_name:"POST",
        method_description:"Register - unsuccessful",
        request_path:"/api/register",
        request_body:{
            uesrId: "bhaskar@gmail.com",
        },
        response_code:400,
        response_body:["Give Correct AND All Details"]
    },
    {
        method_name:"POST",
        method_description:"Login - successful",
        request_path:"/api/login",
        request_body:{
            uesrId: "bhaskar@gmail.com",
            password:"watchmen"
        },
        response_code:200,
        response_body:["LOGED IN"]
    },
    {
        method_name:"POST",
        method_description:"Login - unsuccessful",
        request_path:"/api/login",
        request_body:{
            uesrId: "bhaskar@gmail.com",
        },
        response_code:200,
        response_body:["NO NO"]
    },
    
    
];
export const mthd = {
    data:methods1
};
