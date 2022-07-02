export default function Login(){
    return(

<div>
    <h1>Login form for Admin</h1>
    <form>
    <input id='id' placeholder="Put your id" />
    <input password='id' placeholder="Put your poassword" />
    </form>
    
<style jsx>{`
input {
    display:block;
}
div {
    position:relative;
    margin:20px;
}
`}

</style>

</div>

    );
}