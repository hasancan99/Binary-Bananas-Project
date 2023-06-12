

const questionShow = async (questionNum) =>{
    try {const response = await fetch("http://localhost:3000/questions")
    if (response.ok){
        const question = await response.json()
        console.log(question)
    } else{
        throw "Something has gone wrong with one of the API requests";
    }
} catch (e) {
    console.log(e);
}

}

questionShow(1)
