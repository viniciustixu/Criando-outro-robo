const isLoggedIn = document.cookie.includes("isLoggedIn=true");
document.oncontextmenu = function() {
  return false;
}

if (!isLoggedIn) {
    window.location.href = "index.html";
} else {
    // Agende o redirecionamento após 10 segundos
    setTimeout(function () {
        // Limpe o cookie e redirecione
        document.cookie = "isLoggedIn=; max-age=0; path=/";
        window.location.href = "index.html";
    }, 10000); // 10 segundos em milissegundos
}