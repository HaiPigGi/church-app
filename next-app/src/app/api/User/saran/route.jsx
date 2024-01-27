

const get_session = () => {
  return sessionStorage.getItem('jwtToken');
};
export async function inputSaran(Saran){
    console.log(Saran)
    const token = get_session();

    try{
        let res = await fetch(
            `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/user/saran/store`,
            {
                method:'POST',
                mode:'cors',
                headers:{
                    Authorization: `bearer ${token}`,
                },
                body:Saran,
            },
        );
        res = await res.json();
        console.log(res);
        if(res.status== 201){
            return res;
        }
        return res.error;
    }catch(e){
        console.log('error sayang : ', e.message);
    }
}
