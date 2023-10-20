@echo off

    REM Generate icons using cordova-res
    call npx cordova-res android --icon --skip-config --skip-splash

    REM Copy icons in the dedicated folder
    copy resources\android\icon\drawable-ldpi-icon.png android\app\src\main\res\mipmap-ldpi\ic_launcher.png
    copy resources\android\icon\drawable-ldpi-icon.png android\app\src\main\res\mipmap-ldpi\ic_launcher_foreground.png
    copy resources\android\icon\drawable-ldpi-icon.png android\app\src\main\res\mipmap-ldpi\ic_launcher_round.png

    copy resources\android\icon\drawable-mdpi-icon.png android\app\src\main\res\mipmap-mdpi\ic_launcher.png
    copy resources\android\icon\drawable-mdpi-icon.png android\app\src\main\res\mipmap-mdpi\ic_launcher_foreground.png
    copy resources\android\icon\drawable-mdpi-icon.png android\app\src\main\res\mipmap-mdpi\ic_launcher_round.png

    copy resources\android\icon\drawable-hdpi-icon.png android\app\src\main\res\mipmap-hdpi\ic_launcher.png
    copy resources\android\icon\drawable-hdpi-icon.png android\app\src\main\res\mipmap-hdpi\ic_launcher_foreground.png
    copy resources\android\icon\drawable-hdpi-icon.png android\app\src\main\res\mipmap-hdpi\ic_launcher_round.png

    copy resources\android\icon\drawable-xhdpi-icon.png android\app\src\main\res\mipmap-xhdpi\ic_launcher.png
    copy resources\android\icon\drawable-xhdpi-icon.png android\app\src\main\res\mipmap-xhdpi\ic_launcher_foreground.png
    copy resources\android\icon\drawable-xhdpi-icon.png android\app\src\main\res\mipmap-xhdpi\ic_launcher_round.png

    copy resources\android\icon\drawable-xxhdpi-icon.png android\app\src\main\res\mipmap-xxhdpi\ic_launcher.png
    copy resources\android\icon\drawable-xxhdpi-icon.png android\app\src\main\res\mipmap-xxhdpi\ic_launcher_foreground.png
    copy resources\android\icon\drawable-xxhdpi-icon.png android\app\src\main\res\mipmap-xxhdpi\ic_launcher_round.png

    copy resources\android\icon\drawable-xxxhdpi-icon.png android\app\src\main\res\mipmap-xxxhdpi\ic_launcher.png
    copy resources\android\icon\drawable-xxxhdpi-icon.png android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_foreground.png
    copy resources\android\icon\drawable-xxxhdpi-icon.png android\app\src\main\res\mipmap-xxxhdpi\ic_launcher_round.png

    echo The icons are up to date
    pause