/* ----- CODE GENERATOR ----- */

let exit_codes = "@@ filename = \"CertificateFRA\"\n@@ start = 64\n@@\n\nmvn r12, #0xE1                ;  R12=notE1=FFFFFF1E\nbic r12,r12, #0xED00000       ;  R12=R12 and notED00000=F12FFF1E\nbic r11,r12, #0x1000000E      ;  R11=R12 and not1000000E=E12FFF10=bx r0 opcpde\nadcs r12,pc, #0x30            ;  R12=PC+30\nstr r11, [r12, #0]!           ;  Store bx r0 opcode in [r12]\nadc r12,lr, #0xE30            ;  R12=LR+E30\nadc r12,r12, #0xD30000        ;  R12=R12+D30000\nbic r12,r12, #0xC00000        ;  R12=R12 and notC00000\nadc r0,r12, #0xE2             ;  R0=R12+E2=????FRA\n\n====================\n\n@@ filename = \"WhiteOutFRA\"\n@@ start = 64\n@@\n\nmvn r12, #0xE1            ;  R12=notE1=FFFFFF1E\nbic r12,r12, #0xED00000   ;  R12=R12 and notED00000=F12FFF1E\nbic r11,r12, #0x1000000E  ;  R11=R12 and not1000000E=E12FFF10=bx r0 opcpde\nadcs r12,pc, #0x30        ;  R12=PC+30\nstr r11, [r12, #0]!       ;  Store bx r0 opcode in [r12]\nadc r12,lr, #0xA10        ;  R12=LR+A10\nadc r12,r12, #0xD30000    ;  R12=R12+D30000\nbic r12,r12, #0xC00000    ;  R12=R12 and notC00000\nadc r0,r12, #0xC8         ;  R0=R12+C8=SetCB2WhiteOutFRA\n\n====================\n\n@@ filename = \"CertificateShortFRA\"\n@@ start = 92\n@@\n\nadc r12,lr, #0xE30            ;  R12=LR+E30\nadc r12,r12, #0xD30000        ;  R12=R12+D30000\nbic r12,r12, #0xC00000        ;  R12=R12 and notC00000\nadc r0,r12, #0xE2             ;  R0=R12+E2=????FRA\n\n====================\n\n@@ filename = \"CertificateFullFRA\"\n@@ start = 56\n@@\n\nadcs r12, pc, #0x38           ;  R12=&Box14Name + 3\nmvn r11, #0xE1                ;  R11=notE1=FFFFFF1E\nbic r11, r11, #0xED00000      ;  R11=R11 and notED00000=F12FFF1E\nbic r11, r11, #0x1000000E     ;  R11=R11 and not1000000E=E12FFF10=bx r0 opcode\nstr r11, [r12, #0]!           ;  Store bx r0 opcode in [r12]\n\nadc r12,lr, #0xE30            ;  R12=LR+E30\nadc r12,r12, #0xD30000        ;  R12=R12+D30000\nbic r12,r12, #0xC00000        ;  R12=R12 and notC00000\nadc r0,r12, #0xE2             ;  R0=R12+E2=????FRA\n0                             ;  Fill box 14 with space\n\n====================\n\n@@ filename = \"Bootstrapped\"\n@@ start = 116\n@@\n";

function translate(code){
    code = code.replace(/␣/g, "_");
    code = code.replace(/“/g, "«");
    code = code.replace(/”/g, "»");
    code = code.replace(/–/g, "-");
    return code; 
}

function build_code(txt) {
    let res = aceGen.build(txt, exit_codes);
    return res.map(translate);
}

function html_for_code(txt) {
    let res = build_code(txt);
    let arr = res.map(str => "<li>" + str + "</li>");
    return "<ul class=\"ace\">" + arr.join("\n") + "</ul>";
}

function generate(e) {
    let target_id = e.dataset.target;
    let source_id = e.dataset.source;
    let preprocess = e.dataset.preprocess;
    let target = document.getElementById(target_id);
    let source = document.getElementById(source_id);
    let input = preprocess ? eval(preprocess+"(source.textContent)") : source.textContent ;
    target.innerHTML = html_for_code(input);
}

/* ----- INPUT FIELDS ----- */

let pkmn = {};
pkmn["Bulbizarre"]=1;pkmn["Herbizarre"]=2;pkmn["Florizarre"]=3;pkmn["Salamèche"]=4;pkmn["Reptincel"]=5;pkmn["Dracaufeu"]=6;pkmn["Carapuce"]=7;pkmn["Carabaffe"]=8;pkmn["Tortank"]=9;pkmn["Chenipan"]=10;pkmn["Chrysacier"]=11;pkmn["Papilusion"]=12;pkmn["Aspicot"]=13;pkmn["Coconfort"]=14;pkmn["Dardargnan"]=15;pkmn["Roucool"]=16;pkmn["Roucoups"]=17;pkmn["Roucarnage"]=18;pkmn["Rattata"]=19;pkmn["Rattatac"]=20;pkmn["Piafahec"]=21;pkmn["Rapasdepic"]=22;pkmn["Abo"]=23;pkmn["Arbok"]=24;pkmn["Pikachu"]=25;pkmn["Raichu"]=26;pkmn["Sabelette"]=27;pkmn["Sablaireau"]=28;pkmn["Nidoran F"]=29;pkmn["Nidorina"]=30;pkmn["Nidoqueen"]=31;pkmn["Nidoran M"]=32;pkmn["Nidorino"]=33;pkmn["Nidoking"]=34;pkmn["Mélofée"]=35;pkmn["Mélodelfe"]=36;pkmn["Goupix"]=37;pkmn["Feunard"]=38;pkmn["Rondoudou"]=39;pkmn["Grodoudou"]=40;pkmn["Nosférapti"]=41;pkmn["Nosféralto"]=42;pkmn["Mystherhe"]=43;pkmn["Ortide"]=44;pkmn["Rafflesia"]=45;pkmn["Paras"]=46;pkmn["Parasect"]=47;pkmn["Mimitoss"]=48;pkmn["Aeromite"]=49;pkmn["Taupiqueur"]=50;pkmn["Triopikeur"]=51;pkmn["Miaouss"]=52;pkmn["Persian"]=53;pkmn["Psykokwak"]=54;pkmn["Akwakwak"]=55;pkmn["Ferosinge"]=56;pkmn["Colossinge"]=57;pkmn["Caninos"]=58;pkmn["Arcanin"]=59;pkmn["Ptitard"]=60;pkmn["Tétarte"]=61;pkmn["Tartard"]=62;pkmn["Abra"]=63;pkmn["Kadahra"]=64;pkmn["Alakazam"]=65;pkmn["Machoc"]=66;pkmn["Machopeur"]=67;pkmn["Mackogneur"]=68;pkmn["Chétiflor"]=69;pkmn["Boustiflor"]=70;pkmn["Empiflor"]=71;pkmn["Tentacool"]=72;pkmn["Tentacruel"]=73;pkmn["Racaillou"]=74;pkmn["Gravalanch"]=75;pkmn["Grolem"]=76;pkmn["Ponyta"]=77;pkmn["Galopa"]=78;pkmn["Ramoloss"]=79;pkmn["Flagadoss"]=80;pkmn["Magneti"]=81;pkmn["Magneton"]=82;pkmn["Canarticho"]=83;pkmn["Doduo"]=84;pkmn["Dodrio"]=85;pkmn["Otaria"]=86;pkmn["Lamantine"]=87;pkmn["Tadmorv"]=88;pkmn["Grotadmorv"]=89;pkmn["Kokiyas"]=90;pkmn["Crustabri"]=91;pkmn["Fantominus"]=92;pkmn["Spectrum"]=93;pkmn["Ectoplasma"]=94;pkmn["Onix"]=95;pkmn["Soporifik"]=96;pkmn["Hypnomade"]=97;pkmn["Krabby"]=98;pkmn["Kraboss"]=99;pkmn["Voltorbe"]=100;pkmn["Électrode"]=101;pkmn["Noeunoeuf"]=102;pkmn["Noadkoko"]=103;pkmn["Osselait"]=104;pkmn["Ossateur"]=105;pkmn["Kicklee"]=106;pkmn["Tygnon"]=107;pkmn["Excelangue"]=108;pkmn["Smogo"]=109;pkmn["Smogogo"]=110;pkmn["Rhinocorne"]=111;pkmn["Rhinoféros"]=112;pkmn["Leveinard"]=113;pkmn["Saquedeneu"]=114;pkmn["Kangourex"]=115;pkmn["Hypotrempe"]=116;pkmn["Hypocéan"]=117;pkmn["Poissirène"]=118;pkmn["Poissoroy"]=119;pkmn["Stari"]=120;pkmn["Staross"]=121;pkmn["M.Mime"]=122;pkmn["Insécateur"]=123;pkmn["Lippoutou"]=124;pkmn["Élektek"]=125;pkmn["Magmar"]=126;pkmn["Scarabrute"]=127;pkmn["Taurus"]=128;pkmn["Magicarpe"]=129;pkmn["Léviator"]=130;pkmn["Lokhlass"]=131;pkmn["Metamorph"]=132;pkmn["Évoli"]=133;pkmn["Aquali"]=134;pkmn["Voltali"]=135;pkmn["Pyroli"]=136;pkmn["Porygon"]=137;pkmn["Amonita"]=138;pkmn["Amonistar"]=139;pkmn["Kabuto"]=140;pkmn["Kabutops"]=141;pkmn["Ptéra"]=142;pkmn["Ronflex"]=143;pkmn["Artikodin"]=144;pkmn["Électhor"]=145;pkmn["Sulfura"]=146;pkmn["Minidraco"]=147;pkmn["Draco"]=148;pkmn["Dracolosse"]=149;pkmn["Mewtwo"]=150;pkmn["Mew"]=151;pkmn["Germignon"]=152;pkmn["Macronium"]=153;pkmn["Méganium"]=154;pkmn["Héricendre"]=155;pkmn["Feurisson"]=156;pkmn["Typhlosion"]=157;pkmn["Kaiminus"]=158;pkmn["Crocrodil"]=159;pkmn["Aligatueur"]=160;pkmn["Fouinette"]=161;pkmn["Fouinar"]=162;pkmn["Hoothoot"]=163;pkmn["Noarfang"]=164;pkmn["Coxy"]=165;pkmn["Coxyclaque"]=166;pkmn["Mimigal"]=167;pkmn["Migalos"]=168;pkmn["Nostenfer"]=169;pkmn["Loupio"]=170;pkmn["Lanturn"]=171;pkmn["Pichu"]=172;pkmn["Mélo"]=173;pkmn["Toudoudou"]=174;pkmn["Togépi"]=175;pkmn["Togétic"]=176;pkmn["Natu"]=177;pkmn["Xatu"]=178;pkmn["Wattouat"]=179;pkmn["Lainergie"]=180;pkmn["Pharamp"]=181;pkmn["Joliflor"]=182;pkmn["Marill"]=183;pkmn["Azumarill"]=184;pkmn["Simularbre"]=185;pkmn["Tarpaud"]=186;pkmn["Granivol"]=187;pkmn["Floravol"]=188;pkmn["Cotovol"]=189;pkmn["Capumain"]=190;pkmn["Tournegrin"]=191;pkmn["Héliatronc"]=192;pkmn["Yanma"]=193;pkmn["Axoloto"]=194;pkmn["Maraiste"]=195;pkmn["Mentali"]=196;pkmn["Noctali"]=197;pkmn["Cornèbre"]=198;pkmn["Roigada"]=199;pkmn["Feuforêve"]=200;pkmn["Zarbi A"]=201;pkmn["Qulbutoké"]=202;pkmn["Girafarig"]=203;pkmn["Pomdepik"]=204;pkmn["Foretress"]=205;pkmn["lnsolourdo"]=206;pkmn["Scorplane"]=207;pkmn["Steelix"]=208;pkmn["Snubbull"]=209;pkmn["Granbull"]=210;pkmn["Qwilfish"]=211;pkmn["Cizayox"]=212;pkmn["Caratroc"]=213;pkmn["Scarhino"]=214;pkmn["Farfuret"]=215;pkmn["Teddiursa"]=216;pkmn["Ursaring"]=217;pkmn["Limagma"]=218;pkmn["Volcaropod"]=219;pkmn["Marcacrin"]=220;pkmn["Cochignon"]=221;pkmn["Corayon"]=222;pkmn["Remoraid"]=223;pkmn["Octillery"]=224;pkmn["Cadoizo"]=225;pkmn["Demanta"]=226;pkmn["Airmure"]=227;pkmn["Malosse"]=228;pkmn["Demolosse"]=229;pkmn["Hyporoi"]=230;pkmn["Phanpy"]=231;pkmn["Donphan"]=232;pkmn["Porygon 2"]=233;pkmn["Cerfrousse"]=234;pkmn["Queulorior"]=235;pkmn["Debugant"]=236;pkmn["Kapoera"]=237;pkmn["Lippouti"]=238;pkmn["Elekid"]=239;pkmn["Maghy"]=240;pkmn["Ecremeuh"]=241;pkmn["Leuphorie"]=242;pkmn["Raikou"]=243;pkmn["Entei"]=244;pkmn["Suicune"]=245;pkmn["Embrylex"]=246;pkmn["Ymphect"]=247;pkmn["Tyranocif"]=248;pkmn["Lugia"]=249;pkmn["Ho-oh"]=250;pkmn["Celebi"]=251;pkmn["Arcko"]=277;pkmn["Massko"]=278;pkmn["Jungko"]=279;pkmn["Poussifeu"]=280;pkmn["Galifeu"]=281;pkmn["Brasegali"]=282;pkmn["Gobou"]=283;pkmn["Flobio"]=284;pkmn["Laggron"]=285;pkmn["Medhyena"]=286;pkmn["Grahyena"]=287;pkmn["Zigzaton"]=288;pkmn["Linéon"]=289;pkmn["Chenipotte"]=290;pkmn["Armulys"]=291;pkmn["Charmillon"]=292;pkmn["Blindalys"]=293;pkmn["Papinox"]=294;pkmn["Nénupiot"]=295;pkmn["Lombre"]=296;pkmn["Ludicolo"]=297;pkmn["Grainipiot"]=298;pkmn["Pifeuil"]=299;pkmn["Tengalice"]=300;pkmn["Ningale"]=301;pkmn["Ninjask"]=302;pkmn["Munja"]=303;pkmn["Nirondelle"]=304;pkmn["Hélédelle"]=305;pkmn["Balignon"]=306;pkmn["Chapignon"]=307;pkmn["Spinda"]=308;pkmn["Goélise"]=309;pkmn["Bekipan"]=310;pkmn["Arakdo"]=311;pkmn["Maskadra"]=312;pkmn["Wailmer"]=313;pkmn["Wailord"]=314;pkmn["Skitty"]=315;pkmn["Delcatty"]=316;pkmn["Kecleon"]=317;pkmn["Balbuto"]=318;pkmn["Kaorine"]=319;pkmn["Tarinor"]=320;pkmn["Chartor"]=321;pkmn["Tenefix"]=322;pkmn["Barloche"]=323;pkmn["Barbicha"]=324;pkmn["Lovdisc"]=325;pkmn["Écrapince"]=326;pkmn["Colhomard"]=327;pkmn["Barpau"]=328;pkmn["Milobellus"]=329;pkmn["Carvanha"]=330;pkmn["Sharpedo"]=331;pkmn["Kraknoix"]=332;pkmn["Vibraninf"]=333;pkmn["Libégon"]=334;pkmn["Makuhita"]=335;pkmn["Hariyama"]=336;pkmn["Dynavolt"]=337;pkmn["Élecsprint"]=338;pkmn["Chamallot"]=339;pkmn["Camerupt"]=340;pkmn["Obalie"]=341;pkmn["Phogleur"]=342;pkmn["Kaimorse"]=343;pkmn["Cacnea"]=344;pkmn["Cacturne"]=345;pkmn["Stalgamin"]=346;pkmn["Oniglali"]=347;pkmn["Séléroc"]=348;pkmn["Solaroc"]=349;pkmn["Azurill"]=350;pkmn["Spoink"]=351;pkmn["Groret"]=352;pkmn["Posipi"]=353;pkmn["Négapi"]=354;pkmn["Mysdibule"]=355;pkmn["Meditikka"]=356;pkmn["Charmina"]=357;pkmn["Tylton"]=358;pkmn["Altaria"]=359;pkmn["Okéoké"]=360;pkmn["Skélénox"]=361;pkmn["Téraclope"]=362;pkmn["Rosélia"]=363;pkmn["Parecool"]=364;pkmn["Vigoroth"]=365;pkmn["Monaflèmit"]=366;pkmn["Gloupti"]=367;pkmn["Avaltout"]=368;pkmn["Tropius"]=369;pkmn["Chuchmur"]=370;pkmn["Ramboum"]=371;pkmn["Brouhabam"]=372;pkmn["Coquiperl"]=373;pkmn["Serpang"]=374;pkmn["Rosabyss"]=375;pkmn["Absol"]=376;pkmn["Polichombr"]=377;pkmn["Branette"]=378;pkmn["Séviper"]=379;pkmn["Mangriff"]=380;pkmn["Relicanth"]=381;pkmn["Galekid"]=382;pkmn["Galegon"]=383;pkmn["Galeking"]=384;pkmn["Morphéo"]=385;pkmn["Muciole"]=386;pkmn["Lumivole"]=387;pkmn["Lilia"]=388;pkmn["Vacilys"]=389;pkmn["Anorith"]=390;pkmn["Armaldo"]=391;pkmn["Tarsal"]=392;pkmn["Kirlia"]=393;pkmn["Gardevoir"]=394;pkmn["Draby"]=395;pkmn["Drackhaus"]=396;pkmn["Drattak"]=397;pkmn["Terhal"]=398;pkmn["Métang"]=399;pkmn["Métalosse"]=400;pkmn["Regirock"]=401;pkmn["Regice"]=402;pkmn["Registeel"]=403;pkmn["Kyogre"]=404;pkmn["Groudon"]=405;pkmn["Rayquaza"]=406;pkmn["Latias"]=407;pkmn["Latios"]=408;pkmn["Jirachi"]=409;pkmn["Deoxys"]=410;pkmn["Éoko"]=411;pkmn["Oeuf"]=412;

let obj = {};
obj["Master Ball"]=1;obj["Super Ball"]=2;obj["Hyper Ball"]=3;obj["Poké Ball"]=4;obj["Safari Ball"]=5;obj["Filet Ball"]=6;obj["Scuba Ball"]=7;obj["Faiblo Ball"]=8;obj["Bis Ball"]=9;obj["Chrono Ball"]=10;obj["Luxe Ball"]=11;obj["Honor Ball"]=12;obj["Potion"]=13;obj["Antidote"]=14;obj["Anti-brûle"]=15;obj["Antigel"]=16;obj["Réveil"]=17;obj["Anti-Para"]=18;obj["Total Soin"]=19;obj["Potion Max"]=20;obj["Hyper Potion"]=21;obj["Super Potion"]=22;obj["Guérison"]=23;obj["Rappel"]=24;obj["Rappel Max"]=25;obj["Eau Fraîche"]=26;obj["Soda Cool"]=27;obj["Limonade"]=28;obj["Lait Meumeu"]=29;obj["Poudrénergie"]=30;obj["Racinénergie"]=31;obj["Poudre Soin"]=32;obj["Herbe Rappel"]=33;obj["Huile"]=34;obj["Huile Max"]=35;obj["Élixir"]=36;obj["Max Élixir"]=37;obj["Lava Cookie"]=38;obj["Flûte Bleue"]=39;obj["Flûte Jaune"]=40;obj["Flûte Rouge"]=41;obj["Flûte Noire"]=42;obj["Flûte Blanche"]=43;obj["Jus de Baie"]=44;obj["Cendresacrée"]=45;obj["Sel Tréfonds"]=46;obj["Co. Tréfonds"]=47;obj["Tesson Rouge"]=48;obj["Tesson Bleu"]=49;obj["Tesson Jaune"]=50;obj["Tesson Vert"]=51;obj["PV Plus"]=63;obj["Protéine"]=64;obj["Fer"]=65;obj["Carbone"]=66;obj["Calcium"]=67;obj["Super Bonbon"]=68;obj["PP Plus"]=69;obj["Zinc"]=70;obj["PP Max"]=71;obj["Défense Spéc."]=73;obj["Muscle +"]=74;obj["Attaque +"]=75;obj["Défense +"]=76;obj["Vitesse +"]=77;obj["Précision +"]=78;obj["Spécial +"]=79;obj["Poké Poupée"]=80;obj["Queue Skitty"]=81;obj["Super Repousse"]=83;obj["Max Repousse"]=84;obj["Corde Sortie"]=85;obj["Repousse"]=86;obj["Pierresoleil"]=93;obj["Pierre Lune"]=94;obj["Pierre Feu"]=95;obj["Pierrefoudre"]=96;obj["Pierre Eau"]=97;obj["Pierreplante"]=98;obj["Petit Champi"]=101;obj["Gros Champi"]=102;obj["Perle"]=104;obj["Grosse Perle"]=105;obj["Pouss. Étoile"]=106;obj["Morc. Étoile"]=107;obj["Pépite"]=108;obj["Écaillecoeur"]=109;obj["Lettre Oranj"]=121;obj["Lettre Port"]=122;obj["Lettre Brill"]=123;obj["Lettre Meca"]=124;obj["Lettre Bois"]=125;obj["Lettre Vague"]=126;obj["Lettre Bulle"]=127;obj["Lettre Ombre"]=128;obj["Lettre Tropi"]=129;obj["Lettre Songe"]=130;obj["Lettre Cool"]=131;obj["Lettre Retro"]=132;obj["Baie Ceriz"]=133;obj["Baie Maron"]=134;obj["Baie Pecha"]=135;obj["Baie Fraive"]=136;obj["Baie Willia"]=137;obj["Baie Mepo"]=138;obj["Baie Oran"]=139;obj["Baie Kika"]=140;obj["Baie Prine"]=141;obj["Baie Sitrus"]=142;obj["Baie Figuy"]=143;obj["Baie Wiki"]=144;obj["Baie Mago"]=145;obj["Baie Gowav"]=146;obj["Baie Papaya"]=147;obj["Baie Framby"]=148;obj["Baie Remu"]=149;obj["Baie Nanab"]=150;obj["Baie Repoi"]=151;obj["Baie Nanana"]=152;obj["Baie Grena"]=153;obj["Baie Alga"]=154;obj["Baie Qualot"]=155;obj["Baie Lonme"]=156;obj["Baie Resin"]=157;obj["Baie Tomato"]=158;obj["Baie Siam"]=159;obj["Baie Mangou"]=160;obj["Baie Rabuta"]=161;obj["Baie Tronci"]=162;obj["Baie Kiwan"]=163;obj["Baie Palma"]=164;obj["Baie Stekpa"]=165;obj["Baie Durin"]=166;obj["Baie Myrte"]=167;obj["Baie Lichii"]=168;obj["Baie Lingan"]=169;obj["Baie Sailak"]=170;obj["Baie Pitaye"]=171;obj["Baie Abriko"]=172;obj["Baie Lansat"]=173;obj["Baie Frista"]=174;obj["Baie Enigma"]=175;obj["PoudreClaire"]=179;obj["HerbeBlanche"]=180;obj["Brac. Macho"]=181;obj["Multi Exp"]=182;obj["Vive Griffe"]=183;obj["Grelot Zen"]=184;obj["Herbe Mental"]=185;obj["Band. Choix"]=186;obj["Roche Royale"]=187;obj["Poudre Argent"]=188;obj["Piece Rune"]=189;obj["Rune Purif."]=190;obj["Rosée Âme"]=191;obj["Dent Océan"]=192;obj["Écaille Océan"]=193;obj["Boule Fumée"]=194;obj["Pierre Stase"]=195;obj["Bandeau"]=196;obj["Oeuf Chance"]=197;obj["Lentilscope"]=198;obj["Peau Métal"]=199;obj["Restes"]=200;obj["Écailledraco"]=201;obj["Ballelumière"]=202;obj["Sable Doux"]=203;obj["Pierre Dure"]=204;obj["Grain Miracl"]=205;obj["Lunet. Noires"]=206;obj["Ceint. Noire"]=207;obj["Aimant"]=208;obj["Eau Mystique"]=209;obj["Bec Pointu"]=210;obj["Pic Venin"]=211;obj["Glacéternel"]=212;obj["Rune Sort"]=213;obj["Cuillertordu"]=214;obj["Charbon"]=215;obj["Croc Dragon"]=216;obj["Mouch. Soie"]=217;obj["Améliorator"]=218;obj["Grelot Coque"]=219;obj["Encens Mer"]=220;obj["Encens Doux"]=221;obj["Poing Chance"]=222;obj["Poudre Métal"]=223;obj["Masse Os"]=224;obj["Bâton"]=225;obj["Foul. Rouge"]=254;obj["Foul. Bleu"]=255;obj["Foul. Rose"]=256;obj["Foul. Vert"]=257;obj["Foul. Jaune"]=258;obj["Vélo Course"]=259;obj["Boite Jetons"]=260;obj["Cherch'Objet"]=261;obj["Canne"]=262;obj["Super Canne"]=263;obj["Mega Canne"]=264;obj["Passe Bateau"]=265;obj["Passeconcour"]=266;obj["Seau Wailmer"]=268;obj["Pack Devon"]=269;obj["Sac à suie"]=270;obj["Clé Sous-sol"]=271;obj["Vélo Cross"]=272;obj["Boite Pokéblocs"]=273;obj["Lettre"]=274;obj["Passe Éon"]=275;obj["Orbe Rouge"]=276;obj["Orbe Bleu"]=277;obj["Scanner"]=278;obj["Lunet. Sable"]=279;obj["Météorite"]=280;obj["Clé Salle 1"]=281;obj["Clé Salle 2"]=282;obj["Clé salle 4"]=283;obj["Clé salle 6"]=284;obj["Clé Stockage"]=285;obj["Foss. Racine"]=286;obj["Foss. Griffe"]=287;obj["Devon Scope"]=288;obj["CT01"]=289;obj["CT02"]=290;obj["CT03"]=291;obj["CT04"]=292;obj["CT05"]=293;obj["CT06"]=294;obj["CT07"]=295;obj["CT08"]=296;obj["CT09"]=297;obj["CT10"]=298;obj["CT11"]=299;obj["CT12"]=300;obj["CT13"]=301;obj["CT14"]=302;obj["CT15"]=303;obj["CT16"]=304;obj["CT17"]=305;obj["CT18"]=306;obj["CT19"]=307;obj["CT20"]=308;obj["CT21"]=309;obj["CT22"]=310;obj["CT23"]=311;obj["CT24"]=312;obj["CT25"]=313;obj["CT26"]=314;obj["CT27"]=315;obj["CT28"]=316;obj["CT29"]=317;obj["CT30"]=318;obj["CT31"]=319;obj["CT32"]=320;obj["CT33"]=321;obj["CT34"]=322;obj["CT35"]=323;obj["CT36"]=324;obj["CT37"]=325;obj["CT38"]=326;obj["CT39"]=327;obj["CT40"]=328;obj["CT41"]=329;obj["CT42"]=330;obj["CT43"]=331;obj["CT44"]=332;obj["CT45"]=333;obj["CT46"]=334;obj["CT47"]=335;obj["CT48"]=336;obj["CT49"]=337;obj["CT50"]=338;obj["CS01"]=339;obj["CS02"]=340;obj["CS03"]=341;obj["CS04"]=342;obj["CS05"]=343;obj["CS06"]=344;obj["CS07"]=345;obj["CS08"]=346;obj["Colis Chen"]=349;obj["Pokéflute"]=350;obj["Clé Secrète"]=351;obj["Bon Commande"]=352;obj["Dent d'Or"]=353;obj["Vieil Ambre"]=354;obj["Carte Magn."]=355;obj["Clé Asc."]=356;obj["Nautile"]=357;obj["Fossile Dome"]=358;obj["Scope Sylphe"]=359;obj["Bicyclette"]=360;obj["Carte"]=361;obj["Cherche VS"]=362;obj["Memorydex"]=363;obj["Boite CT"]=364;obj["Sac à Baies"]=365;obj["TV ABC"]=366;obj["Tri-Passe"]=367;obj["Passe Prime"]=368;obj["Thé"]=369;obj["Ticketmystik"]=370;obj["Ticketaurora"]=371;obj["Pot Poudre"]=372;obj["Rubis"]=373;obj["Saphir"]=374;obj["Sceau Magma"]=375;obj["Vieillecarte"]=376;

function pokemon_identifier(str) {
    if (str in pkmn)
        return pkmn[str].toString();
    else
        return str.replace("$", "0x");
}

function object_identifier(str) {
    if (str in obj)
        return obj[str].toString();
    else
        return str.replace("$", "0x");
}

window.addEventListener ("load", () => {
    let pkmnlist = document.getElementById('pokemonlist');
    Object.keys(pkmn).forEach(function(item){
        var option = document.createElement('option');
        option.value = item;
        pkmnlist.appendChild(option);
     });
     let objlist = document.getElementById('objectlist');
     Object.keys(obj).forEach(function(item){
         var option = document.createElement('option');
         option.value = item;
         objlist.appendChild(option);
      });
});