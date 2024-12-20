import { useNavigate } from "react-router-dom";

function Homepage(){

  const navigate = useNavigate();

    return(
        <>
        <header className="header w-full">
        <div className="container">
        <nav className="fixed top-0 h-[80px] w-screen left-0 flex items-center justify-between px-8 bg-[#013A40]">
              <div className="flex items-center">
                <img
                  src="./assets/logo.png"
                  alt="App logo"
                  className="w-[191.5px] h-[46px]"
                />
              </div>

              <ul className="flex space-x-8 text-[#73E9F4] text-lg font-semibold">
                <li>
                  <a href="#about" className="hover:text-white transition duration-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition duration-300">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition duration-300">
                    Contact Us
                  </a>
                </li>
              </ul>

              <div className="flex space-x-4">
                <button onClick={() => navigate("/login")} className="px-6 py-2 text-[#73E9F4] text-lg font-semibold bg-transparent border-2 border-[#73E9F4] rounded-full hover:bg-[#73E9F4] hover:text-[#013A40] transition duration-300">
                  Login
                </button>
                <a href="#contact" className="px-6 py-2 text-[#013A40] text-lg font-semibold bg-[#73E9F4] rounded-full hover:bg-white hover:text-[#013A40] transition duration-300">
                  Contact Us
                </a>
              </div>
            </nav>

          <div className="bg-[url('./assets/hero-section.jpg')] h-[500px] w-screen mt-16 flex flex-col justify-center items-center">
            <h1 className="text-7xl font-extrabold text-[#0094A2] mb-4 w-[1200px]">Revolutionizing <span className="text-[#115F67]">Credit Evaluation</span> with <span className="text-[#115F67]">AI-Driven Solutions</span></h1>
            <p className="text-lg font-medium text-[#115F67] mb-20  w-[900px]">Enhance banking decisions with the power of advanced analytics, leveraging AI-driven insights and delivering personalized credit solutions tailored to your clients' unique needs.</p>
            <a href="#contact" className="font-extrabold bg-[#FF8903] text-[#013A40] px-6 py-3 rounded-full text-center flex items-center space-x-2">
              <span>Request a Demo</span>
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block"
              >
                <path d="m6.5 17.5 11-11m0 0h-9m9 0v9" />
              </svg>
            </a>
          </div>
        </div>
      </header>


    <section id="about" className="w-screen">
        <div className="h-[500px] flex flex-row justify-between items-center bg-[#0F3C41] px-24 py-10 gap-16">
          <div className="flex-shrink-0">
            <img
              alt="Hand reaching for our logo"
              src="./assets/about-us.png"
              className="w-[300px] h-[300px] object-contain"
            />
          </div>

          <div className="flex flex-col max-w-[950px] text-left">
            <h2 className="text-[#0094A2] font-bold text-4xl mb-4">About Us</h2>
            <p className="text-xl font-semibold text-[#FFFFFF] mb-6">
              Transforming Credit Decision-Making with Technology and Innovation
            </p>
            <div className="text-[#B4E3E6] text-base leading-relaxed space-y-4">
              <p>
                We are dedicated to revolutionizing the way financial institutions assess credit eligibility. By combining cutting-edge AI technology with advanced analytics, our mission is to empower banking agents to make confident, data-driven decisions, reducing risks and enhancing customer satisfaction.
              </p>
              <p>
                With a focus on innovation and transparency, our team is committed to providing tools that simplify complex processes. Our solution not only improves efficiency but also builds trust between banks and their customers by delivering accurate and personalized credit recommendations.
              </p>
            </div>
          </div>
        </div>
    </section>

    <section id="features" className="services-section bg-[#F8FBFC] py-16 w-screen">
  <div className="container mx-auto text-center px-8">
    <h2 className="text-[#013A40] font-bold text-xl mb-4">Our Services</h2>
    <p className="text-[#0096A4] font-bold text-4xl mb-2">
      Empower Credit Decisions with Advanced AI Solutions
    </p>
    <p className="text-[#115F67] text-lg max-w-2xl mx-auto mb-12">
      We deliver innovative tools for accurate predictions, tailored recommendations, and seamless operations.
    </p>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

      <div className="service flex flex-col items-center text-center">
        <img
          src="./assets/predict.png"
          alt="Predict Credit Scores"
          className="w-28 h-28 mb-4"
        />
        <h3 className="text-[#115F67] text-lg font-semibold w-[180px]">
          Accurately predict credit scores
        </h3>
      </div>


      <div className="service flex flex-col items-center text-center">
        <img
          src="./assets/recommend.png"
          alt="Personalized Credit Suggestions"
          className="w-24 h-24 mb-[34.5px]"
        />
        <h3 className="text-[#115F67] text-lg font-semibold w-[180px]">
          Offer personalized credit product suggestions
        </h3>
      </div>

      <div className="service flex flex-col items-center text-center">
        <img
          src="./assets/automatic-emails.png"
          alt="Send Recommendations"
          className="w-20 h-20 mb-[50px]"
        />
        <h3 className="text-[#115F67] text-lg font-semibold w-[180px]">
          Send automatic credit recommendations via email
        </h3>
      </div>

      <div className="service flex flex-col items-center text-center">
        <img
          src="./assets/import.png"
          alt="Import Client Data"
          className="w-20 h-20 mb-[50px]"
        />
        <h3 className="text-[#115F67] text-lg font-semibold w-[180px]">
          Import client batches & recalculate credit scores anytime
        </h3>
      </div>
    </div>
  </div>
</section>

<section id="contact" className="contact-section bg-[#FBC88E] py-16 w-screen">
  <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-8">
    <div className="p-8 w-full lg:w-[40%] mb-8 lg:mb-0 text-left">
      <h2 className="text-[#FF8903] font-bold text-4xl mb-2">Contact Us</h2>
      <p className="text-[#FFFFFF] text-xl mb-6">Send us a message</p>
      <form className="contact-form space-y-4">
        <input
          type="text"
          placeholder="Full name"
          className="w-[350px] p-3 rounded-md border border-[#E8CBAA] text-[#444] focus:outline-none focus:ring-2 focus:ring-[#FF8903]"
        />
        <input
          type="email"
          placeholder="Your email"
          className="w-[350px] p-3 rounded-md border border-[#E8CBAA] text-[#444] focus:outline-none focus:ring-2 focus:ring-[#FF8903]"
        />
        <textarea
          placeholder="Your message"
          className="w-full p-3 rounded-md border border-[#E8CBAA] text-[#444] focus:outline-none focus:ring-2 focus:ring-[#FF8903] h-32"
        ></textarea>
        <button
          type="submit"
          className="w-[250px] bg-[#FF8903] text-white font-bold py-3 rounded-md hover:bg-[#E07702] transition duration-300"
        >
          Request a Demo
        </button>
      </form>
    </div>

    <div className="text-section lg:w-[50%] text-center lg:text-left">
      <h2 className="text-[#005F67] text-7xl font-extrabold text-right leading-tight mb-4">
        Let’s Build Better Credit Solutions Together
      </h2>
      <p className="text-[#FF8903] font-bold text-lg text-right">
        Enhance banking decisions with the power of advanced analytics, leveraging AI-driven insights and delivering personalized credit solutions tailored to your clients' unique needs.
      </p>
    </div>
  </div>
</section>
          <footer
            className="bottom-0 left-0 w-screen
            flex justify-between items-center
            p-2
            text-opacity-50 bg-[#FBC88E]"
            >
              <p className="text-xs">© Credify Inc. All rights reserved</p>
              <p className="text-xs">Contact support</p>
          </footer>
        </>
    )

}

export default Homepage;