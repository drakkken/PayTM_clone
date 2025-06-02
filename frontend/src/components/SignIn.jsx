import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function SignIn({
  className,
  ...props
}) {

  const [email,setEmail]= useState("");
  const [password,setPassword] = useState("");
  const nav = useNavigate();

  
  const handleEmail = (e)=>{
      setEmail(e.target.value)
  }
  const handlePass = (e)=>{
    setPassword(e.target.value)
}

  const make = async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:7000/api/v1/user/signIn",{
      "email":email,
      "password":password
    })
    .then(res=>{
      if(res.status==200)
      {
        console.log("sucessfully signed in ");
        localStorage.setItem("token",res.data.token);
        nav("/dashboard");

      }
    })
  }
  return (
    <div className={cn("fixed inset-0 min-h-screen w-full bg-gradient-to-br from-black to-gray-900 backdrop-blur-md overflow-y-auto", className)} {...props}>
      <div className="min-h-screen w-full flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-black/40 backdrop-blur-md border-white/10">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
            <CardDescription className="text-white/70">
              Sign in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    className="bg-black/40 border-white/10 text-white placeholder:text-white/50 focus:border-white/20 focus:ring-white/20" 
                    placeholder="m@example.com" 
                    required 
                    onChange={handleEmail}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <a href="#" className="text-sm text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline">
                      Forgot password?
                    </a>
                  </div>
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
                  Sign In
                </Button>
                <div className="text-center text-sm text-white/70">
                  Don&apos;t have an account?{" "}
                  <a href="/signUp" className="text-blue-400 hover:text-blue-300 underline underline-offset-4">
                    Sign up
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
