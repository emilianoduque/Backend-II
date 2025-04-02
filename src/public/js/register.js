document.addEventListener("DOMContentLoaded", () => {
    const formRegister = document.getElementById("registerForm");

    formRegister.addEventListener("submit", async(e) => {
        try {
            e.preventDefault()
            const formData = new FormData(formRegister)
            const userData = Object.fromEntries(formData)
            const response = await fetch("http://localhost:8080/api/sessions/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"  
                },
                body: JSON.stringify(userData),
                credentials: "include"
            })

            const data = await response.json()
            if(data?.message === "Usuario registrado correctamente") {
                Toastify({
                    text: data.message,
                    duration: 3000,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    },
                    onClick: function(){}
                }).showToast();
                setTimeout(() => {
                    window.location.href = "http://localhost:8080/api/sessions/viewLogin"
                }, 3000);
            } else {
                console.log(data);
            }
        } catch (error) {
            console.log(error);
        }
    })
})