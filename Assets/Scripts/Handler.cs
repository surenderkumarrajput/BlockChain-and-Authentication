using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class Handler : MonoBehaviour
{
    public User _user;
    public InputField username,password;
    public Button loginButton;
    public Button createButton;

    public delegate void Login(string user,string pass);
    public static Login loginDelegate;

    public delegate void SignUP(string user,string pass);
    public static SignUP Signup;

     private void Start()
    {
     Signup+=CreateUser;
     loginDelegate += login;
     loginButton.onClick.AddListener(()=>SetUI(username.text,password.text));
     createButton.onClick.AddListener(()=>CreateUserFunction(username.text,password.text));
    }

    public static void CreateUser(string user,string pass)
    {
        Debug.Log(user);
        Application.ExternalCall("createUser",user,pass);
    }

    public static void login(string user,string pass)
    {
        Debug.Log(user);
        Application.ExternalCall("validation",user,pass);
    }

   public void CreateUserFunction(string user,string pass)
   {
       Signup(user,pass);
   }
    public void SetUI(string user,string pass)
    {
        loginDelegate(user,pass);
    }
    public void userInput()
    {
       _user.user=username.text;
       _user.password=password.text;
    }

}
