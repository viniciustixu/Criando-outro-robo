const isLoggedIn = document.cookie.includes("isLoggedIn=true");
document.oncontextmenu = function() {
  return false;
}

if (!isLoggedIn) {
    window.location.href = "redirecionamento.html";
} else {
    setTimeout(function () {
        // Limpe o cookie e redirecione
        document.cookie = "isLoggedIn=; max-age=0; path=/";
        window.location.href = "index.html";
    }, 3600000); // 5 horas em milissegundos
}
