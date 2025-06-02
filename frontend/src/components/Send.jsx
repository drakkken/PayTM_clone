import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"
import { useSearchParams } from "react-router-dom"

export function Send({
  className,
  ...props
}) {
  const [search] = useSearchParams();
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
 

  const id = search.get("id")
  const name = search.get("name")

  const handleSend = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:7000/api/v1/accounts/transfer",
        {
          to: id,
          amount: parseFloat(amount)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        console.log("Transfer successful");
        navigate("/dashboard");
      }
    } catch (error) {
      alert("You cant pay above your Balance")
      console.error("Transfer failed:", error);
    }
  };

  return (
    <div className={cn("min-h-screen w-full bg-gradient-to-br from-black to-gray-900 p-6", className)} {...props}>
      <Card className="w-full max-w-md mx-auto bg-black/40 backdrop-blur-md border-white/10">
        <CardHeader>
          <CardTitle className="text-2xl text-white">Send Money</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Receiver Info */}
            <div className="p-4 bg-black/20 rounded-lg border border-white/10">
              <p className="text-white/70 text-sm">Sending to</p>
              <p className="text-white text-xl font-semibold">{name.toUpperCase() || "Unknown User"}</p>
            </div>

            {/* Amount Input */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-white">Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                className="bg-black/40 border-white/10 text-white placeholder:text-white/50 focus:border-white/20 focus:ring-white/20"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSend}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!amount || parseFloat(amount) <= 0}
            >
              Send Money
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 