// replicator.script
//tprint('[STARTED] @ ' + getHostname());
var servers2 = [getHostname()];
var scanner = scan(serv);
var servers = servers2.concat(scanner);
print(servers);

for (var i = 0; i < servers.length; ++i) {
    var serv = servers[i];
    switch (serv) {
        case "home":
            break;
        case getHostname():
            break;
        default:
            if (serverExists(serv)) {
                scp("replicator.script", serv);
                scp("hackngrow.script", serv);
                if (!hasRootAccess(serv)) {
                    if (getServerRequiredHackingLevel(serv) > getHackingLevel()) {
                        tprint(serv+' hacking level too high: ' + getServerRequiredHackingLevel(serv));
                    } else {
                        print('hacking ' + serv);
                        var ports = getServerNumPortsRequired(serv);
                        if (ports > 4) {
                            sqlinject(serv);
                        }
                        if (ports > 3) {
                            httpworm(serv);
                        }
                        if (ports > 2) {
                            relaysmtp(serv);
                        }
                        if (ports > 1) {
                            ftpcrack(serv);
                        }
                        if (ports > 0) {
                            brutessh(serv);
                        }
                        nuke(serv);
                    }
                    print(serv + ' rooted');
                }
                killall(serv);
                print('waiting 10s for killing scripts');
                sleep(10000);
                exec("replicator.script", serv, 1, 0);
            }
            break;
    }
}
switch (getHostname()) {
    case "home":
        break;
    default:
        spawn("hackngrow.script", (Math.floor(getServerRam(getHostname())[0] / 2.45)), 0);
        exec("hackngrow.script", getHostname(), (Math.floor(getServerRam(getHostname())[1] / 2.45)), 1);
        print('waiting 5s for script start');
        sleep(5000);
        break;
}
AND

hackngrow.script

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
