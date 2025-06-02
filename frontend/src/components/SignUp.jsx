import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import axios from "axios"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

export function SignUp({
  className,
  ...props
}) {

  const [firstName,setFirstName]=useState("");
  const [lastName,setLastName]=useState("");
  const [email,setEmail]=useState("");
  const [pass,setPass]=useState("");
  const nav = useNavigate();


  const handleChangeFirstName =(e)=>{
    setFirstName(e.target.value);
  }
  const handleLastName =(e)=>{
    setLastName(e.target.value);
  }
  const handleEmail =(e)=>{
    setEmail(e.target.value);
  }
  const handlePass =(e)=>{
    setPass(e.target.value);
  }

  const make = async(e)=>{
    e.preventDefault();
    const username = firstName + ' ' + lastName;

      await axios.post("http://localhost:7000/api/v1/user/signUp",
        {
          "username":username,
          "email":email,
          "firstName":firstName,
          "password":pass,
          "lastName":lastName
        }
      )
      .then(res=>{
        console.log(res.data);
        if(res.data.message == "Successfully added a new user")
        {
          localStorage.setItem(res.data.token)
          nav("/dashboard")
        }
      }).catch(err=>{
        console.log(err)
      })
  }
  return (
    <div className={cn("fixed inset-0 min-h-screen w-full bg-gradient-to-br from-black to-gray-900 backdrop-blur-md overflow-y-auto", className)} {...props}>
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black/40 backdrop-blur-md border-white/10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Create Account</CardTitle>
            <CardDescription className="text-white/70">
              Sign up with your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="firstName" className="text-white">First Name</Label>
                  <Input 
                    id="firstName" 
                    type="text" 
                    className="bg-black/40 border-white/10 text-white placeholder:text-white/50 focus:border-white/20 focus:ring-white/20" 
                    placeholder="John" 
                    onChange={handleChangeFirstName}
                    required 
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="lastName" className="text-white">Last Name</Label>
                  <Input 
                    id="lastName" 
                    type="text" 
                    className="bg-black/40 border-white/10 text-white placeholder:text-white/50 focus:border-white/20 focus:ring-white/20" 
                    placeholder="Doe" 
                    required 
                    onChange={handleLastName}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    className="bg-black/40 border-white/10 text-white placeholder:text-white/50 focus:border-white/20 focus:ring-white/20" 
                    placeholder="john@example.com" 
                    required 
                    onChange={handleEmail}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    className="bg-black/40 border-white/10 text-white placeholder:text-white/50 focus:border-white/20 focus:ring-white/20" 
                    required 
                    onChange={handlePass}
                  />
                </div>
                <Button 
                  type="submit" 
                  variant="default"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={make}
                >
                  Create Account
                </Button>
                <div className="text-center text-sm text-white/70">
                  Already have an account?{" "}
                  <a href="/signIn" className="text-blue-400 hover:text-blue-300 underline underline-offset-4">
                    Sign in
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
