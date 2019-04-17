// hackngrow.script
tprint('[STARTED] @ ' + getHostname());
target = getHostname();
moneyThresh = getServerMaxMoney(target) * 0.95;
securityThresh = getServerMinSecurityLevel(target) + 1;
while (true) {
    if (getServerSecurityLevel(target) > securityThresh) {
        weaken(target);
    } else if (getServerMoneyAvailable(target) < moneyThresh) {
        grow(target);
    } else {
        hack(target);
    }
    clearLog();
}
