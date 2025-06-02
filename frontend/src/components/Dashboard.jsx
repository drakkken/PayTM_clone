import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"




export function Dashboard({
  className,
  ...props
}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [balance, setBalance] = useState(0)
  const [info, setInfo] = useState([]);  // Initialize as empty array
  const [me,setMe] = useState({});

  const token = localStorage.getItem("token");
  const fetch = async() => {
    try {
      const res = await axios.get("http://localhost:7000/api/v1/accounts/balance", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(res.status === 200) {
        console.log("fetch success");
        setBalance(res.data.balance);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }

  const fetchMe= async() => {
    try {
      const res = await axios.get("http://localhost:7000/api/v1/user/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if(res.status === 200) {
        console.log("fetch success");
        setMe(res.data);
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  }
  

  useEffect(() => {
    fetchMe();
    fetch();
    
  }, []);




  useEffect(()=>{
    const filter = async()=>{
      await axios.get("http://localhost:7000/api/v1/user/bulk?filter="+searchQuery)
      .then(res=>{
       const p = res.data.filter(p=>p._id!=me._id)
        setInfo(p)
      })
    }
    filter()
  },[searchQuery,me])

  return (
    <div className={cn("min-h-screen w-full bg-gradient-to-br from-black to-gray-900 p-6", className)} {...props}>
      {/* Balance Card */}
      <Card className="w-full max-w-4xl mx-auto mb-8 bg-black/40 backdrop-blur-md border-white/10">
        <CardHeader>
        <CardTitle className="text-2xl text-white">{me.username}</CardTitle>
          <CardTitle className="text-2xl text-white">Your Balance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-white">₹{balance}</div>
          <p className="text-white/70 mt-2">Available for transactions</p>
        </CardContent>
      </Card>

      {/* Search Bar */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <Input
          type="search"
          placeholder="Search transactions, contacts, or services..."
          className="w-full bg-black/40 border-white/10 text-white placeholder:text-white/50 focus:border-white/20 focus:ring-white/20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Content Area */}
      <Card className="w-full max-w-4xl mx-auto bg-black/40 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-xl text-white">Users</CardTitle>
        </CardHeader>
        
        {info.map((user) => (
          <CardContent key={user._id || user.id} className="flex justify-between items-center border-b border-white/10 last:border-0 py-4">
            <div className="text-white">
              {user.username}
            </div>
            <Button 
              variant="default"
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={(e)=>{
                navigate("/send?id="+user._id+"&name="+user.username);
              }}
            >
              Send
            </Button>
          </CardContent>
        ))}
      </Card>
    </div>
  )
} 