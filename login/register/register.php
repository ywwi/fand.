<?php
    include_once($_SERVER['DOCUMENT_ROOT']."/FANTO/db/db.php");;
    include_once($_SERVER['DOCUMENT_ROOT']."/FANTO/db/session.php");;
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Styles -->
    <link rel="stylesheet" href="../../style/fonts.css">
    <link rel="stylesheet" href="../../style/reset.css">
    <link rel="stylesheet" href="../../style/global.css">
    <link rel="stylesheet" href="../../style/fscreenmenu.css">
    <link rel="stylesheet" href="../login.css">

    <!-- Icons -->
    <?php include($_SERVER['DOCUMENT_ROOT']."/FANTO/included/icon.php"); ?>
    <title>Registro | fand.</title>
</head>
<body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.1/gsap.min.js"></script>
    <script async src="https://unpkg.com/es-module-shims@1.5.18/dist/es-module-shims.js"></script>
    <script type="importmap">
    {
        "imports": {
        "three": "https://unpkg.com/three@0.144.0/build/three.module.js"
        }
    }
    </script>
    <div class="cursor"></div>
    <main>
        <section class="main">
            <?php include($_SERVER['DOCUMENT_ROOT']."/FANTO/included/included.php"); ?>
            <div class="content">
                <div class="form">
                    <div class="welcome">
                        <h1>Registro</h1>
                        <p>Vamos criar uma conta!</p>
                    </div>
                    <form action="register_process.php" method="post">
                        <label>
                            <span>Nome completo</span>
                            <div class="input">
                                <input type="text" name="name" id="name" placeholder="Digite seu nome completo" required>
                            </div>
                        </label>
                        <label>
                            <span>Email</span>
                            <div class="input">
                                <input type="email" name="email" id="email" placeholder="Digite seu email" required>
                            </div>
                        </label>
                        <label>
                            <span>Password</span>
                            <div class="input">
                                <input type="password" name="pass" id="pass" placeholder="Digite sua senha" required>
                            </div>
                        </label>
                        <input type="submit" value="Registrar">
                        <div class="no-account">
                            <a href="../login.php">Já tem uma conta? <strong>Faça login.</strong></a>
                        </div>
                    </form>
                </div>
                <div id="container">
                    <canvas class="webgl"></canvas>
                </div>
            </div>
        </section>
    </main>
    <script src="../../scripts/cursor.js"></script>
    <script src="../../scripts/menu.js"></script>
    <script type="module" src="./register.js"></script>
</body>
</html>