import MainLayout from "@/components/Layouts/MainLayout/index";

export default function Register() {
  return(

<MainLayout>
        <section className="snap-y snap-mandatory h-screen w-full bg-hero bg-fixed bg-center bg-cover bg-no-repeat overflow-hidden">
            <div className="snap-always snap-start w-full h-screen absolute flex justify-center items-center right-[15rem]">
                <div id="content-Hero" className="">
                    <h1 className="text-4xl text-shadow font-bold text-white text-center">Gereja <span className="block text-white">ST. Markus Melak</span></h1>
                    <p className="text-center text-white font-light text-sm text-shadow my-2">Temukan lebih banyak tentang komunitas gereja kami <br/>dengan login sekarang untuk eksplorasi lengkap</p>
                </div>
            </div>

            <div className="bg-white p-4 shadow-md overflow-hidden w-[35rem] h-[100vh] fixed top-[65px] right-0">
                <section className="bg-white">
                    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-20">
                        <a href="#" className="flex items-center mb-6 mr-5 text-2xl font-semibold text-primary">
                            <label className=""/>Register
                        </a>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            {/* <h1 className="text-xl font-bold leading-tight tracking-tight text-yellow-800 md:text-2xl ">Sign in to your account</h1> */}
                                <form className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label  class="block mb-2 text-sm font-medium text-primary ">Username</label>
                                        <input type="text"className="bg-gray-50 border border-yellow-800 text-primary  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :placeholder-gray-400" placeholder="Masukan Nama Anda" required />
                                    </div>
                                    <div>
                                        <label class="block mb-2 text-sm font-medium text-primary ">Password</label>
                                        <input type="password"className="bg-gray-50 border border-yellow-800 text-primary  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :placeholder-gray-400" placeholder="Masukan Password Anda" required />
                                    </div>
                                    <div>
                                        <label class="block mb-2 text-sm font-medium text-primary ">Kondirmasi Password</label>
                                        <input type="password"className="bg-gray-50 border border-yellow-800 text-primary  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :placeholder-gray-400" placeholder="Masukan Ulang Password Anda" required />
                                    </div>
                                    <button type="submit" className="w-full text-white bg-primary focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">Register</button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">already have an account? <a href="/pages/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign in</a></p>    
                                </form>
                        </div>
                        </div>
                    </div>
                </section>
            </div>
        </section>
</MainLayout>
  
    ) 
  
};