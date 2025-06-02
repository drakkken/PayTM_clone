import { Link, useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white font-inter overflow-x-hidden">
      
      {/* NAVBAR */}
      <div className="fixed top-0 w-full h-[12vh] z-50 bg-white/10 backdrop-blur-md border-b border-white/10 shadow-sm flex items-center justify-between px-10">
        <img src="https://www.paytm.com/a/img/paytm_logo.svg" alt="paytm logo" className="h-8" />
        <Link to="/signUp" className="text-sm font-semibold hover:underline">
          Create Account
        </Link>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex justify-center items-center pt-[18vh] pb-20 px-4">
        <div className="bg-white/10 backdrop-blur-md w-full max-w-3xl rounded-2xl border border-white/20 shadow-2xl shadow-black/60 p-10">
          <div className="text-center flex flex-col gap-6 h-full justify-between">
            <div>
              <h2 className="text-4xl font-bold mb-2">Transfer Money Safely</h2>
              <p className="text-md text-white/80 leading-relaxed">
                This Paytm clone is a secure and simple digital wallet that lets you send and receive money,
                pay bills, recharge mobiles, and manage your wallet balance with ease. Built with a clean UI and safe payment handling.
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
              <button
                className="px-6 py-3 w-full md:w-[180px] rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 transition"
                onClick={() => navigate("/signUp")}
              >
                Create Account
              </button>

              <button
                className="px-6 py-3 w-full md:w-[180px] rounded-full font-semibold text-white bg-gray-700 hover:bg-gray-800 transition"
                onClick={() => navigate("/signIn")}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Landing;
