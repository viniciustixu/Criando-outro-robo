        // Array com pares de login e senha válidos
        var usuarios = [
          { login: "usuario1", senha: "senha1" },
          { login: "usuario2", senha: "senha2" },
          { login: "usuario3", senha: "senha3" }
      ];

      // Adicione um ouvinte de evento ao formulário
      document.getElementById("loginForm").addEventListener("submit", function(event) {
          event.preventDefault(); // Impede o envio padrão do formulário

          // Obtenha os valores inseridos pelo usuário
          var inputLogin = document.getElementById("username").value;
          var inputSenha = document.getElementById("password").value;

          // Verifique se o par de login e senha corresponde a um dos pares válidos
          var usuarioValido = usuarios.find(function(usuario) {
              return usuario.login === inputLogin && usuario.senha === inputSenha;
          });

          if (usuarioValido) {
              // Configure um cookie para indicar que o usuário está autenticado
              document.cookie = "isLoggedIn=true; path=/";
              window.location.href = "melhores.html"; // Redirecione para a página após o login bem-sucedido
          } else {
              alert("Login e/ou senha incorretos. Tente novamente.");
          }
      });