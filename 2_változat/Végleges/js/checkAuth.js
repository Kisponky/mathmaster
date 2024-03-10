const checkAuth = async () => {

    try {
        const response = await fetch('http://localhost:8000/api/auth/check-auth', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`,
            },
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Felhasználó be van jelentkezve:', data.message);
        } else {
            console.error('Bejelentkezés ellenőrzése sikertelen:', data.message);
            if (localStorage.getItem("token")) {
                localStorage.removeItem("token")
                if (localStorage.getItem("admin")) {
                    localStorage.removeItem("admin")
                }
                location.href = "../index.html"
            }
        }
    } catch (error) {
        console.error('Hiba a kérés során:', error.message);
        if (localStorage.getItem("token")) {
            localStorage.removeItem("token")
            if (localStorage.getItem("admin")) {
                localStorage.removeItem("admin")
            }
        }
        location.href = "../index.html"
    }
};

if (localStorage.getItem('token') == null && !window.location.href.includes("index.html")) {
    location.href = "../index.html";
}

if (window.location.href.includes("index.html")) {
    if (localStorage.getItem("token")) {
        checkAuth();
    }
  }