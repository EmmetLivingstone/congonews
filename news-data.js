// News data organized by date
const newsByDate = {
    // Today's news
    '2025-04-13': [
        {
            id: 'radio-okapi-1',
            title: 'Elections législatives: la CENI appelle à la patience',
            source: 'Radio Okapi',
            date: 'April 13, 2025',
            category: 'politique',
            content: `<p>La Commission Électorale Nationale Indépendante (CENI) a appelé aujourd'hui les citoyens congolais à faire preuve de patience alors que le dépouillement des votes pour les élections législatives se poursuit.</p>
            <p>"Le processus de comptage est méticuleux et nous voulons assurer que chaque vote soit correctement comptabilisé," a déclaré le président de la CENI lors d'une conférence de presse à Kinshasa.</p>
            <p>Les résultats préliminaires devraient être annoncés dans les prochains jours, avec les résultats définitifs attendus avant la fin du mois.</p>
            <p>Des observateurs internationaux présents dans le pays ont salué jusqu'à présent le déroulement pacifique du scrutin, malgré quelques difficultés logistiques dans certaines régions reculées.</p>`
        },
        {
            id: 'radio-okapi-2',
            title: 'Nord-Kivu: opérations militaires contre des groupes armés',
            source: 'Radio Okapi',
            date: 'April 13, 2025',
            category: 'securite',
            content: `<p>L'armée congolaise a lancé aujourd'hui une nouvelle opération contre des groupes armés dans le territoire de Rutshuru, province du Nord-Kivu.</p>
            <p>Selon un porte-parole militaire, l'opération vise à sécuriser plusieurs localités récemment touchées par des violences qui ont forcé des milliers de personnes à fuir leurs foyers.</p>
            <p>"Nos forces sont déterminées à restaurer la paix et la sécurité dans ces zones afin que les populations déplacées puissent regagner leurs villages," a-t-il déclaré.</p>
            <p>Des organisations humanitaires ont mis en place des points d'assistance pour venir en aide aux civils affectés par ces opérations.</p>`
        },
        {
            id: 'radio-okapi-3',
            title: 'Kinshasa: lancement d\'un programme d\'accès à l\'eau potable',
            source: 'Radio Okapi',
            date: 'April 13, 2025',
            category: 'societe',
            content: `<p>Un nouveau programme visant à améliorer l'accès à l'eau potable dans plusieurs quartiers de Kinshasa a été lancé aujourd'hui par le gouvernement en partenariat avec des organisations internationales.</p>
            <p>Ce projet, d'un coût de 50 millions de dollars, prévoit la construction de forages et de réseaux de distribution d'eau dans des zones périphériques de la capitale qui connaissent des pénuries chroniques.</p>
            <p>"L'accès à l'eau potable est un droit fondamental et un élément essentiel de la santé publique," a déclaré le ministre des Infrastructures lors de la cérémonie de lancement.</p>
            <p>Près de 300 000 personnes devraient bénéficier de ce programme au cours des deux prochaines années.</p>`
        },
        {
            id: 'actualite-1',
            title: 'Affrontements à la frontière: l\'armée congolaise en état d\'alerte',
            source: 'Actualite.cd',
            date: 'April 13, 2025',
            category: 'securite',
            content: `<p>L'état-major des Forces Armées de la République Démocratique du Congo (FARDC) a placé ses troupes en état d'alerte suite à des affrontements signalés à la frontière orientale du pays.</p>
            <p>Selon des sources militaires, des échanges de tirs ont été rapportés dans plusieurs localités frontalières, faisant craindre une escalade des tensions dans la région.</p>
            <p>"Nous avons renforcé notre présence le long de la frontière et nous surveillons attentivement la situation," a indiqué un officier supérieur de l'armée congolaise.</p>
            <p>Le gouvernement a appelé à la retenue et au respect de l'intégrité territoriale du pays, tout en affirmant sa détermination à protéger la population civile.</p>`
        },
        {
            id: 'actualite-2',
            title: 'Réforme électorale: débats houleux à l\'Assemblée nationale',
            source: 'Actualite.cd',
            date: 'April 13, 2025',
            category: 'politique',
            content: `<p>Les discussions sur le projet de réforme de la loi électorale ont donné lieu à des débats houleux aujourd'hui à l'Assemblée nationale, opposant vivement la majorité et l'opposition.</p>
            <p>Le texte, qui propose plusieurs modifications du processus électoral, est critiqué par l'opposition qui y voit une tentative de limiter sa participation aux prochains scrutins.</p>
            <p>"Cette réforme vise uniquement à garantir des élections transparentes et inclusives," a défendu le rapporteur du projet, tandis que des députés de l'opposition ont dénoncé "une manœuvre antidémocratique".</p>
            <p>Le vote sur ce projet de loi est prévu pour la semaine prochaine, après l'examen des nombreux amendements proposés.</p>`
        },
        {
            id: 'rfi-1',
            title: 'RDC: manifestations contre l\'insécurité dans l\'Est',
            source: 'Radio France Internationale',
            date: 'April 13, 2025',
            category: 'securite',
            content: `<p>Des milliers de personnes ont manifesté aujourd'hui dans plusieurs villes de l'Est de la République Démocratique du Congo pour protester contre l'insécurité persistante dans la région.</p>
            <p>À Goma, Bukavu et Bunia, les manifestants ont appelé les autorités à prendre des mesures plus efficaces contre les groupes armés qui continuent de terroriser les populations civiles.</p>
            <p>"Nous sommes fatigués de vivre dans la peur. Nous voulons la paix et la sécurité dans nos communautés," a déclaré un des organisateurs des manifestations.</p>
            <p>Les manifestations se sont déroulées dans le calme, sous une importante présence policière. Le gouvernement a promis de renforcer les opérations militaires dans les zones touchées par les violences.</p>`
        },
        {
            id: 'rfi-2',
            title: 'Rwanda: nouvelles tensions diplomatiques avec la RDC',
            source: 'Radio France Internationale',
            date: 'April 13, 2025',
            category: 'politique',
            content: `<p>Les relations diplomatiques entre le Rwanda et la République Démocratique du Congo connaissent un nouveau pic de tension suite à des déclarations contradictoires concernant la situation sécuritaire à la frontière commune.</p>
            <p>Le ministre rwandais des Affaires étrangères a accusé des groupes armés basés en RDC de mener des incursions sur le territoire rwandais, tandis que Kinshasa dénonce "des allégations sans fondement visant à justifier une ingérence".</p>
            <p>Des médiateurs régionaux appellent au dialogue entre les deux pays pour éviter une escalade qui pourrait déstabiliser davantage la région des Grands Lacs.</p>
            <p>Cette nouvelle crise survient alors que des initiatives diplomatiques étaient en cours pour apaiser les relations entre les deux voisins.</p>`
        },
        {
            id: 'rfi-3',
            title: 'Burundi: coopération renforcée avec la RDC dans le domaine minier',
            source: 'Radio France Internationale',
            date: 'April 13, 2025',
            category: 'economie',
            content: `<p>Le Burundi et la République Démocratique du Congo ont signé aujourd'hui un accord de coopération visant à renforcer leur collaboration dans le secteur minier, notamment pour lutter contre l'exploitation illégale des ressources.</p>
            <p>L'accord prévoit des mécanismes de contrôle conjoints aux frontières et un partage d'informations sur les réseaux de contrebande de minerais.</p>
            <p>"Cette coopération permettra de garantir que les ressources minières de nos pays bénéficient véritablement à nos populations," a déclaré le ministre burundais des Mines lors de la cérémonie de signature à Bujumbura.</p>
            <p>Des experts estiment que cette initiative pourrait contribuer significativement à réduire le trafic illicite de minerais qui alimente certains conflits dans la région.</p>`
        },
        {
            id: 'mines-1',
            title: 'Hausse de la production de cobalt dans le Lualaba',
            source: 'Mines.cd',
            date: 'April 13, 2025',
            category: 'economie',
            content: `<p>La province du Lualaba a enregistré une augmentation significative de sa production de cobalt au premier trimestre 2025, selon les chiffres publiés aujourd'hui par le ministère des Mines.</p>
            <p>Avec une hausse de 15% par rapport à la même période l'année dernière, cette performance est attribuée à la mise en service de nouvelles installations d'extraction et à l'amélioration des techniques de traitement.</p>
            <p>"Le secteur minier congolais continue de se moderniser et de gagner en efficacité," a souligné le ministre provincial des Mines du Lualaba.</p>
            <p>Cette tendance positive devrait se poursuivre avec plusieurs projets d'expansion prévus dans les prochains mois, renforçant la position de la RDC comme premier producteur mondial de cobalt.</p>`
        },
        {
            id: 'mines-2',
            title: 'Nouvelle certification pour les minerais congolais',
            source: 'Mines.cd',
            date: 'April 13, 2025',
            category: 'economie',
            content: `<p>Un nouveau système de certification pour les minerais congolais a été lancé aujourd'hui, visant à garantir leur origine et à assurer qu'ils ne contribuent pas au financement de conflits.</p>
            <p>Cette initiative, soutenue par des organisations internationales et le gouvernement congolais, permettra de tracer les minerais depuis les sites d'extraction jusqu'aux marchés internationaux.</p>
            <p>"Cette certification renforcera la confiance des acheteurs internationaux et valorisera nos ressources sur les marchés mondiaux," a expliqué un responsable de l'organisme de certification.</p>
            <p>Les premières cargaisons de minerais certifiés devraient être exportées dès le mois prochain, avec une prime attendue sur les prix par rapport aux minerais non certifiés.</p>`
        }
    ],
    
    // Yesterday's news
    '2025-04-12': [
        {
            id: 'radio-okapi-4',
            title: 'Nouvelles nominations au sein de l\'appareil judiciaire',
            source: 'Radio Okapi',
            date: 'April 12, 2025',
            category: 'politique',
            content: `<p>Le Président de la République a procédé aujourd'hui à plusieurs nominations au sein de l'appareil judiciaire, dans le cadre de la réforme du système de justice entamée l'année dernière.</p>
            <p>Parmi les postes pourvus figurent ceux de procureurs près les cours d'appel et de présidents de tribunaux dans plusieurs provinces du pays.</p>
            <p>"Ces nominations s'inscrivent dans notre volonté de renforcer l'indépendance et l'efficacité de la justice," a indiqué un communiqué de la présidence.</p>
            <p>Les nouveaux magistrats ont prêté serment lors d'une cérémonie officielle et prendront leurs fonctions dans les prochains jours.</p>`
        },
        {
            id: 'radio-okapi-5',
            title: 'Baisse des incidents sécuritaires au Sud-Kivu, selon la MONUSCO',
            source: 'Radio Okapi',
            date: 'April 12, 2025',
            category: 'securite',
            content: `<p>La Mission de l'ONU en République Démocratique du Congo (MONUSCO) a rapporté une baisse significative des incidents sécuritaires dans la province du Sud-Kivu au cours des trois derniers mois.</p>
            <p>Selon son rapport trimestriel, le nombre d'attaques contre les civils a diminué de 30% par rapport au trimestre précédent, grâce aux opérations conjointes menées avec les forces armées congolaises.</p>
            <p>"Cette tendance positive montre que nos efforts collectifs pour stabiliser la région portent leurs fruits," a déclaré le chef de bureau de la MONUSCO au Sud-Kivu.</p>
            <p>Le rapport souligne toutefois que la situation reste fragile dans certaines zones reculées où des groupes armés maintiennent une présence active.</p>`
        },
        {
            id: 'radio-okapi-6',
            title: 'Lancement d\'un programme de formation professionnelle pour les jeunes',
            source: 'Radio Okapi',
            date: 'April 12, 2025',
            category: 'societe',
            content: `<p>Un programme national de formation professionnelle destiné aux jeunes a été lancé aujourd'hui par le ministère de la Formation Professionnelle en collaboration avec plusieurs partenaires internationaux.</p>
            <p>Cette initiative, qui cible 50 000 jeunes dans l'ensemble du pays, propose des formations dans des domaines variés comme l'agriculture, la construction, les technologies de l'information et l'artisanat.</p>
            <p>"Ce programme répond à un double objectif: réduire le chômage des jeunes et fournir au marché du travail des compétences dont il a besoin," a expliqué le ministre lors de la cérémonie de lancement.</p>
            <p>Les formations, d'une durée de trois à six mois, seront dispensées dans des centres spécialisés et incluront des stages pratiques en entreprise.</p>`
        },
        {
            id: 'actualite-3',
            title: 'Attaque d\'un convoi humanitaire dans l\'Ituri',
            source: 'Actualite.cd',
            date: 'April 12, 2025',
            category: 'securite',
            content: `<p>Un convoi humanitaire a été attaqué hier dans la province de l'Ituri, faisant deux blessés parmi le personnel d'une ONG internationale.</p>
            <p>L'incident s'est produit sur l'axe Bunia-Komanda, lorsque des hommes armés ont ouvert le feu sur les véhicules clairement identifiés comme appartenant à une organisation humanitaire.</p>
            <p>"Cette attaque est inacceptable et constitue une violation grave du droit humanitaire international," a dénoncé le coordinateur humanitaire des Nations Unies en RDC.</p>
            <p>Suite à cet incident, plusieurs organisations ont temporairement suspendu leurs activités dans la zone, privant des milliers de personnes vulnérables d'une aide essentielle.</p>`
        },
        {
            id: 'actualite-4',
            title: 'Le Président nomme un nouveau conseiller spécial pour les questions sécuritaires',
            source: 'Actualite.cd',
            date: 'April 12, 2025',
            category: 'politique',
            content: `<p>Le Chef de l'État a nommé aujourd'hui un nouveau conseiller spécial chargé des questions sécuritaires, dans un contexte de persistance des défis sécuritaires dans plusieurs provinces du pays.</p>
            <p>Cette nomination intervient après une série de consultations avec les responsables des services de défense et de sécurité sur la stratégie à adopter face aux menaces actuelles.</p>
            <p>"La sécurité des Congolais reste la priorité absolue du Président. Cette nomination s'inscrit dans une volonté de renforcer le dispositif de coordination des actions dans ce domaine," indique un communiqué de la présidence.</p>
            <p>Le nouveau conseiller, un ancien officier supérieur de l'armée, prendra ses fonctions immédiatement et travaillera en étroite collaboration avec les ministères concernés.</p>`
        },
        {
            id: 'rfi-4',
            title: 'RDC: une commission parlementaire enquête sur la gestion des ressources naturelles',
            source: 'Radio France Internationale',
            date: 'April 12, 2025',
            category: 'politique',
            content: `<p>L'Assemblée nationale de la RDC a mis en place une commission d'enquête parlementaire sur la gestion des ressources naturelles du pays, suite à des allégations d'irrégularités dans l'attribution de certains contrats miniers.</p>
            <p>Cette commission, composée de députés de la majorité et de l'opposition, dispose de 60 jours pour mener ses investigations et présenter un rapport détaillé.</p>
            <p>"Notre objectif est de faire toute la lumière sur ces allégations et de proposer des recommandations pour améliorer la gouvernance dans ce secteur stratégique," a déclaré le président de la commission.</p>
            <p>Plusieurs hauts responsables des ministères concernés et des entreprises minières devraient être auditionnés dans les prochaines semaines.</p>`
        },
        {
            id: 'rfi-5',
            title: 'Burundi: coopération transfrontalière avec la RDC pour lutter contre le trafic de drogue',
            source: 'Radio France Internationale',
            date: 'April 12, 2025',
            category: 'securite',
            content: `<p>Les autorités burundaises et congolaises ont annoncé la mise en place d'unités mixtes de contrôle aux frontières pour lutter contre le trafic de drogue qui connaît une recrudescence dans la région.</p>
            <p>Cette initiative prévoit des patrouilles conjointes et un partage d'informations sur les réseaux de trafiquants opérant de part et d'autre de la frontière.</p>
            <p>"Le trafic de drogue représente une menace croissante pour notre jeunesse et notre sécurité nationale. Cette coopération est essentielle pour y faire face efficacement," a souligné le ministre burundais de la Sécurité publique.</p>
            <p>Des formations communes pour les agents des forces de l'ordre des deux pays sont prévues dans les prochains mois.</p>`
        },
        {
            id: 'mines-3',
            title: 'Investissements dans le secteur minier artisanal',
            source: 'Mines.cd',
            date: 'April 12, 2025',
            category: 'economie',
            content: `<p>Le gouvernement congolais a annoncé aujourd'hui un programme d'investissement de 50 millions de dollars pour moderniser le secteur minier artisanal et améliorer les conditions de travail des creuseurs.</p>
            <p>Ce programme comprend la fourniture d'équipements de protection, la formation aux techniques d'extraction plus sûres et la mise en place de centres d'achat officiels pour garantir des prix équitables.</p>
            <p>"L'exploitation minière artisanale fait vivre des millions de Congolais. Il est essentiel d'améliorer ce secteur pour qu'il soit plus sûr, plus rentable et respectueux de l'environnement," a déclaré le ministre des Mines.</p>
            <p>Le programme sera d'abord déployé dans les provinces du Haut-Katanga et du Lualaba avant d'être étendu à d'autres régions minières du pays.</p>`
        }
    ],
    
    // Day before yesterday
    '2025-04-11': [
        {
            id: 'radio-okapi-7',
            title: 'Débat à l\'Assemblée nationale sur la réforme constitutionnelle',
            source: 'Radio Okapi',
            date: 'April 11, 2025',
            category: 'politique',
            content: `<p>Les députés ont entamé aujourd'hui l'examen du projet de réforme constitutionnelle proposé par le gouvernement, avec des discussions animées sur plusieurs dispositions controversées.</p>
            <p>Les débats se sont particulièrement concentrés sur les modifications concernant l'organisation du pouvoir judiciaire et les relations entre l'exécutif et le législatif.</p>
            <p>"Cette réforme vise à moderniser nos institutions et à les rendre plus efficaces face aux défis actuels," a défendu le ministre de la Justice, tandis que certains députés de l'opposition ont exprimé des inquiétudes quant à "un possible affaiblissement des contre-pouvoirs".</p>
            <p>Les discussions se poursuivront dans les prochains jours avant un vote prévu la semaine prochaine.</p>`
        },
        {
            id: 'radio-okapi-8',
            title: 'Nouvelles stratégies de démobilisation des groupes armés',
            source: 'Radio Okapi',
            date: 'April 11, 2025',
            category: 'securite',
            content: `<p>La Commission nationale de désarmement, démobilisation et réinsertion (CONADER) a présenté aujourd'hui une nouvelle stratégie visant à encourager les membres des groupes armés à déposer les armes.</p>
            <p>Ce plan, élaboré en collaboration avec des partenaires internationaux, propose des incitations économiques et des garanties de sécurité pour les combattants qui acceptent de réintégrer la vie civile.</p>
            <p>"Notre approche combine des mesures incitatives pour les individus et un dialogue politique avec les groupes armés," a expliqué le coordinateur de la CONADER.</p>
            <p>Plusieurs projets pilotes seront lancés dans les prochaines semaines dans les zones les plus affectées par la présence de groupes armés.</p>`
        },
        {
            id: 'radio-okapi-9',
            title: 'Lancement d\'un projet d\'électrification rurale dans le Kongo Central',
            source: 'Radio Okapi',
            date: 'April 11, 2025',
            category: 'societe',
            content: `<p>Un projet d'électrification rurale d'envergure a été lancé aujourd'hui dans la province du Kongo Central, visant à connecter une vingtaine de localités au réseau électrique national.</p>
            <p>Ce projet, financé par la Banque mondiale et le gouvernement congolais, prévoit l'installation de lignes de distribution et de transformateurs dans des zones jusqu'ici privées d'électricité.</p>
            <p>"L'accès à l'électricité est un facteur crucial de développement économique et d'amélioration des conditions de vie," a souligné le gouverneur de la province lors de la cérémonie de lancement.</p>
            <p>Environ 150 000 personnes devraient bénéficier de ce projet qui sera réalisé sur une période de deux ans.</p>`
        },
        {
            id: 'actualite-5',
            title: 'Affrontements entre deux groupes armés au Nord-Kivu',
            source: 'Actualite.cd',
            date: 'April 11, 2025',
            category: 'securite',
            content: `<p>De violents affrontements ont éclaté entre deux groupes armés dans le territoire de Masisi, province du Nord-Kivu, provoquant le déplacement de plusieurs milliers de civils.</p>
            <p>Selon des sources locales, ces combats seraient liés à des différends concernant le contrôle de zones minières artisanales riches en coltan et en cassitérite.</p>
            <p>"La situation humanitaire est préoccupante, avec des populations qui ont fui dans la précipitation sans pouvoir emporter leurs biens," a alerté un responsable d'une ONG locale.</p>
            <p>L'armée congolaise a annoncé le déploiement de renforts pour rétablir l'ordre et protéger les civils dans la région.</p>`
        },
        {
            id: 'actualite-6',
            title: 'Le Parlement adopte une loi sur la protection des lanceurs d\'alerte',
            source: 'Actualite.cd',
            date: 'April 11, 2025',
            category: 'politique',
            content: `<p>L'Assemblée nationale a adopté aujourd'hui une loi visant à protéger les lanceurs d'alerte en République Démocratique du Congo, une première dans le pays.</p>
            <p>Ce texte, qui avait fait l'objet de longues discussions, prévoit des mesures de protection pour les personnes qui signalent des actes de corruption ou d'autres infractions dans l'intérêt public.</p>
            <p>"Cette loi représente une avancée majeure dans notre lutte contre la corruption et pour la bonne gouvernance," s'est félicité le rapporteur du texte.</p>
            <p>La société civile, qui avait plaidé pour l'adoption de ce cadre légal, a salué ce vote tout en appelant à sa mise en œuvre effective.</p>`
        },
        {
            id: 'rfi-6',
            title: 'RDC: une nouvelle stratégie pour protéger les parcs nationaux',
            source: 'Radio France Internationale',
            date: 'April 11, 2025',
            category: 'environnement',
            content: `<p>L'Institut Congolais pour la Conservation de la Nature (ICCN) a dévoilé aujourd'hui une nouvelle stratégie pour renforcer la protection des parcs nationaux face aux menaces croissantes du braconnage et de l'exploitation illégale des ressources.</p>
            <p>Ce plan quinquennal prévoit le recrutement et la formation de nouveaux gardes-forestiers, l'acquisition d'équipements modernes de surveillance et le développement d'activités économiques alternatives pour les communautés riveraines.</p>
            <p>"La RDC abrite un patrimoine naturel exceptionnel que nous avons le devoir de préserver pour les générations futures," a déclaré le directeur général de l'ICCN.</p>
            <p>Plusieurs partenaires internationaux ont annoncé leur soutien à cette initiative, avec des financements qui pourraient atteindre 80 millions de dollars sur cinq ans.</p>`
        },
        {
            id: 'rfi-7',
            title: 'Rwanda: dialogue avec la RDC sur la gestion des ressources transfrontalières',
            source: 'Radio France Internationale',
            date: 'April 11, 2025',
            category: 'environnement',
            content: `<p>Des experts rwandais et congolais se sont réunis à Gisenyi pour discuter de la gestion commune des ressources naturelles transfrontalières, notamment le lac Kivu et le parc des Virunga.</p>
            <p>Cette rencontre technique, organisée sous l'égide de la Communauté Économique des Pays des Grands Lacs (CEPGL), vise à établir des protocoles de coopération pour la préservation de ces écosystèmes partagés.</p>
            <p>"Malgré les tensions politiques, la coopération technique sur ces questions environnementales reste essentielle pour les deux pays," a souligné un participant à la réunion.</p>
            <p>Un projet d'accord cadre devrait être soumis aux gouvernements respectifs dans les prochaines semaines.</p>`
        },
        {
            id: 'mines-4',
            title: 'Découverte d\'un important gisement de lithium au Katanga',
            source: 'Mines.cd',
            date: 'April 11, 2025',
            category: 'economie',
            content: `<p>Une société minière a annoncé aujourd'hui la découverte d'un important gisement de lithium dans la province du Haut-Katanga, qui pourrait faire de la RDC un acteur majeur sur le marché mondial de ce minerai stratégique.</p>
            <p>Selon les premières estimations, ce gisement contiendrait plusieurs millions de tonnes de lithium de haute qualité, utilisé notamment dans la fabrication des batteries pour véhicules électriques.</p>
            <p>"Cette découverte représente une opportunité considérable pour diversifier notre production minière et nous positionner sur le marché des matériaux essentiels à la transition énergétique," a déclaré le PDG de la société.</p>
            <p>Des études de faisabilité seront menées dans les prochains mois pour déterminer les modalités d'exploitation de ce gisement.</p>`
        }
    ]
};es armés',
            source: 'Radio Okapi',
            date: 'April 13, 2025',
            category: 'securite',
            content: `<p>L'armée congolaise a lancé aujourd'hui une nouvelle opération contre des groupes armés dans le territoire de Rutshuru, province du Nord-Kivu.</p>
            <p>Selon un porte-parole militaire, l'opération vise à sécuriser plusieurs localités récemment touchées par des violences qui ont forcé des milliers de personnes à fuir leurs foyers.</p>
            <p>"Nos forces sont déterminées à restaurer la paix et la sécurité dans ces zones afin que les populations déplacées puissent regagner leurs villages," a-t-il déclaré.</p>
            <p>Des organisations humanitaires ont mis en place des points d'assistance pour venir en aide aux civils affectés par ces opérations.</p>`
        },
        {
            id: 'radio-okapi-3',
            title: 'Kinshasa: lancement d\'un programme d\'accès à l\'eau potable',
            source: 'Radio Okapi',
            date: 'April 13, 2025',
            category: 'societe',
            content: `<p>Un nouveau programme visant à améliorer l'accès à l'eau potable dans plusieurs quartiers de Kinshasa a été lancé aujourd'hui par le gouvernement en partenariat avec des organisations internationales.</p>
            <p>Ce projet, d'un coût de 50 millions de dollars, prévoit la construction de forages et de réseaux de distribution d'eau dans des zones périphériques de la capitale qui connaissent des pénuries chroniques.</p>
            <p>"L'accès à l'eau potable est un droit fondamental et un élément essentiel de la santé publique," a déclaré le ministre des Infrastructures lors de la cérémonie de lancement.</p>
            <p>Près de 300 000 personnes devraient bénéficier de ce programme au cours des deux prochaines années.</p>`
        },
        {
            id: 'actualite-1',
            title: 'Affrontements à la frontière: l\'armée congolaise en état d\'alerte',
            source: 'Actualite.cd',
            date: 'April 13, 2025',
            category: 'securite',
            content: `<p>L'état-major des Forces Armées de la République Démocratique du Congo (FARDC) a placé ses troupes en état d'alerte suite à des affrontements signalés à la frontière orientale du pays.</p>
            <p>Selon des sources militaires, des échanges de tirs ont été rapportés dans plusieurs localités frontalières, faisant craindre une escalade des tensions dans la région.</p>
            <p>"Nous avons renforcé notre présence le long de la frontière et nous surveillons attentivement la situation," a indiqué un officier supérieur de l'armée congolaise.</p>
            <p>Le gouvernement a appelé à la retenue et au respect de l'intégrité territoriale du pays, tout en affirmant sa détermination à protéger la population civile.</p>`
        },
        {
            id: 'actualite-2',
            title: 'Réforme électorale: débats houleux à l\'Assemblée nationale',
            source: 'Actualite.cd',
            date: 'April 13, 2025',
            category: 'politique',
            content: `<p>Les discussions sur le projet de réforme de la loi électorale ont donné lieu à des débats houleux aujourd'hui à l'Assemblée nationale, opposant vivement la majorité et l'opposition.</p>
            <p>Le texte, qui propose plusieurs modifications du processus électoral, est critiqué par l'opposition qui y voit une tentative de limiter sa participation aux prochains scrutins.</p>
            <p>"Cette réforme vise uniquement à garantir des élections transparentes et inclusives," a défendu le rapporteur du projet, tandis que des députés de l'opposition ont dénoncé "une manœuvre antidémocratique".</p>
            <p>Le vote sur ce projet de loi est prévu pour la semaine prochaine, après l'examen des nombreux amendements proposés.</p>`
        },
        {
            id: 'rfi-1',
            title: 'RDC: manifestations contre l\'insécurité dans l\'Est',
            source: 'Radio France Internationale',
            date: 'April 13, 2025',
            category: 'securite',
            content: `<p>Des milliers de personnes ont manifesté aujourd'hui dans plusieurs villes de l'Est de la République Démocratique du Congo pour protester contre l'insécurité persistante dans la région.</p>
            <p>À Goma, Bukavu et Bunia, les manifestants ont appelé les autorités à prendre des mesures plus efficaces contre les groupes armés qui continuent de terroriser les populations civiles.</p>
            <p>"Nous sommes fatigués de vivre dans la peur. Nous voulons la paix et la sécurité dans nos communautés," a déclaré un des organisateurs des manifestations.</p>
            <p>Les manifestations se sont déroulées dans le calme, sous une importante présence policière. Le gouvernement a promis de renforcer les opérations militaires dans les zones touchées par les violences.</p>`
        },
        {
            id: 'rfi-2',
            title: 'Rwanda: nouvelles tensions diplomatiques avec la RDC',
            source: 'Radio France Internationale',
            date: 'April 13, 2025',
            category: 'politique',
            content: `<p>Les relations diplomatiques entre le Rwanda et la République Démocratique du Congo connaissent un nouveau pic de tension suite à des déclarations contradictoires concernant la situation sécuritaire à la frontière commune.</p>
            <p>Le ministre rwandais des Affaires étrangères a accusé des groupes armés basés en RDC de mener des incursions sur le territoire rwandais, tandis que Kinshasa dénonce "des allégations sans fondement visant à justifier une ingérence".</p>
            <p>Des médiateurs régionaux appellent au dialogue entre les deux pays pour éviter une escalade qui pourrait déstabiliser davantage la région des Grands Lacs.</p>
            <p>Cette nouvelle crise survient alors que des initiatives diplomatiques étaient en cours pour apaiser les relations entre les deux voisins.</p>`
        },
        {
            id: 'rfi-3',
            title: 'Burundi: coopération renforcée avec la RDC dans le domaine minier',
            source: 'Radio France Internationale',
            date: 'April 13, 2025',
            category: 'economie',
            content: `<p>Le Burundi et la République Démocratique du Congo ont signé aujourd'hui un accord de coopération visant à renforcer leur collaboration dans le secteur minier, notamment pour lutter contre l'exploitation illégale des ressources.</p>
            <p>L'accord prévoit des mécanismes de contrôle conjoints aux frontières et un partage d'informations sur les réseaux de contrebande de minerais.</p>
            <p>"Cette coopération permettra de garantir que les ressources minières de nos pays bénéficient véritablement à nos populations," a déclaré le ministre burundais des Mines lors de la cérémonie de signature à Bujumbura.</p>
            <p>Des experts estiment que cette initiative pourrait contribuer significativement à réduire le trafic illicite de minerais qui alimente certains conflits dans la région.</p>`
        },
        {
            id: 'mines-1',
            title: 'Hausse de la production de cobalt dans le Lualaba',
            source: 'Mines.cd',
            date: 'April 13, 2025',
            category: 'economie',
            content: `<p>La province du Lualaba a enregistré une augmentation significative de sa production de cobalt au premier trimestre 2025, selon les chiffres publiés aujourd'hui par le ministère des Mines.</p>
            <p>Avec une hausse de 15% par rapport à la même période l'année dernière, cette performance est attribuée à la mise en service de nouvelles installations d'extraction et à l'amélioration des techniques de traitement.</p>
            <p>"Le secteur minier congolais continue de se moderniser et de gagner en efficacité," a souligné le ministre provincial des Mines du Lualaba.</p>
            <p>Cette tendance positive devrait se poursuivre avec plusieurs projets d'expansion prévus dans les prochains mois, renforçant la position de la RDC comme premier producteur mondial de cobalt.</p>`
        },
        {
            id: 'mines-2',
            title: 'Nouvelle certification pour les minerais congolais',
            source: 'Mines.cd',
            date: 'April 13, 2025',
            category: 'economie',
            content: `<p>Un nouveau système de certification pour les minerais congolais a été lancé aujourd'hui, visant à garantir leur origine et à assurer qu'ils ne contribuent pas au financement de conflits.</p>
            <p>Cette initiative, soutenue par des organisations internationales et le gouvernement congolais, permettra de tracer les minerais depuis les sites d'extraction jusqu'aux marchés internationaux.</p>
            <p>"Cette certification renforcera la confiance des acheteurs internationaux et valorisera nos ressources sur les marchés mondiaux," a expliqué un responsable de l'organisme de certification.</p>
            <p>Les premières cargaisons de minerais certifiés devraient être exportées dès le mois prochain, avec une prime attendue sur les prix par rapport aux minerais non certifiés.</p>`
        }
    ],
    
    // Yesterday's news
    '2025-04-12': [
        {
            id: 'radio-okapi-4',
            title: 'Nouvelles nominations au sein de l\'appareil judiciaire',
            source: 'Radio Okapi',
            date: 'April 12, 2025',
            category: 'politique',
            content: `<p>Le Président de la République a procédé aujourd'hui à plusieurs nominations au sein de l'appareil judiciaire, dans le cadre de la réforme du système de justice entamée l'année dernière.</p>
            <p>Parmi les postes pourvus figurent ceux de procureurs près les cours d'appel et de présidents de tribunaux dans plusieurs provinces du pays.</p>
            <p>"Ces nominations s'inscrivent dans notre volonté de renforcer l'indépendance et l'efficacité de la justice," a indiqué un communiqué de la présidence.</p>
            <p>Les nouveaux magistrats ont prêté serment lors d'une cérémonie officielle et prendront leurs fonctions dans les prochains jours.</p>`
        },
        {
            id: 'radio-okapi-5',
            title: 'Baisse des incidents sécuritaires au Sud-Kivu, selon la MONUSCO',
            source: 'Radio Okapi',
            date: 'April 12, 2025',
            category: 'securite',
            content: `<p>La Mission de l'ONU en République Démocratique du Congo (MONUSCO) a rapporté une baisse significative des incidents sécuritaires dans la province du Sud-Kivu au cours des trois derniers mois.</p>
            <p>Selon son rapport trimestriel, le nombre d'attaques contre les civils a diminué de 30% par rapport au trimestre précédent, grâce aux opérations conjointes menées avec les forces armées congolaises.</p>
            <p>"Cette tendance positive montre que nos efforts collectifs pour stabiliser la région portent leurs fruits," a déclaré le chef de bureau de la MONUSCO au Sud-Kivu.</p>
            <p>Le rapport souligne toutefois que la situation reste fragile dans certaines zones reculées où des groupes armés maintiennent une présence active.</p>`
        },
        {
            id: 'radio-okapi-6',
            title: 'Lancement d\'un programme de formation professionnelle pour les jeunes',
            source: 'Radio Okapi',
            date: 'April 12, 2025',
            category: 'societe',
            content: `<p>Un programme national de formation professionnelle destiné aux jeunes a été lancé aujourd'hui par le ministère de la Formation Professionnelle en collaboration avec plusieurs partenaires internationaux.</p>
            <p>Cette initiative, qui cible 50 000 jeunes dans l'ensemble du pays, propose des formations dans des domaines variés comme l'agriculture, la construction, les technologies de l'information et l'artisanat.</p>
            <p>"Ce programme répond à un double objectif: réduire le chômage des jeunes et fournir au marché du travail des compétences dont il a besoin," a expliqué le ministre lors de la cérémonie de lancement.</p>
            <p>Les formations, d'une durée de trois à six mois, seront dispensées dans des centres spécialisés et incluront des stages pratiques en entreprise.</p>`
        },
        {
            id: 'actualite-3',
            title: 'Attaque d\'un convoi humanitaire dans l\'Ituri',
            source: 'Actualite.cd',
            date: 'April 12, 2025',
            category: 'securite',
            content: `<p>Un convoi humanitaire a été attaqué hier dans la province de l'Ituri, faisant deux blessés parmi le personnel d'une ONG internationale.</p>
            <p>L'incident s'est produit sur l'axe Bunia-Komanda, lorsque des hommes armés ont ouvert le feu sur les véhicules clairement identifiés comme appartenant à une organisation humanitaire.</p>
            <p>"Cette attaque est inacceptable et constitue une violation grave du droit humanitaire international," a dénoncé le coordinateur humanitaire des Nations Unies en RDC.</p>
            <p>Suite à cet incident, plusieurs organisations ont temporairement suspendu leurs activités dans la zone, privant des milliers de personnes vulnérables d'une aide essentielle.</p>`
        },
        {
            id: 'actualite-4',
            title: 'Le Président nomme un nouveau conseiller spécial pour les questions sécuritaires',
            source: 'Actualite.cd',
            date: 'April 12, 2025',
            category: 'politique',
            content: `<p>Le Chef de l'État a nommé aujourd'hui un nouveau conseiller spécial chargé des questions sécuritaires, dans un contexte de persistance des défis sécuritaires dans plusieurs provinces du pays.</p>
            <p>Cette nomination intervient après une série de consultations avec les responsables des services de défense et de sécurité sur la stratégie à adopter face aux menaces actuelles.</p>
            <p>"La sécurité des Congolais reste la priorité absolue du Président. Cette nomination s'inscrit dans une volonté de renforcer le dispositif de coordination des actions dans ce domaine," indique un communiqué de la présidence.</p>
            <p>Le nouveau conseiller, un ancien officier supérieur de l'armée, prendra ses fonctions immédiatement
