export class ComplexFormValue{
    personalInfo!:{
        firstName: String
        lastName: String
    }

    contactPreference!:String
   
    email?:{
        email: String
        confirmMail: String
    }
    phone?: String

    loginInfo!:{
        username: String
        password: String
        confirmPassword:String
    }
}