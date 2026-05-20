# Compte Rendu TP2 SAE1.02

## Objectif

Réalisation de la maquette du secteur réseau de l'entreprise et notation des tests et des résultats

## Choix du Routeur 

Cisco Packet Tracer mets à notre disposition trois routeur de la série 800 qui ont chacun leurs spécificité.

Nous choisirons alors ceului qui sera le plus intéressant pour notre projet.

### Routeur 829

Le Cisco IR829 est une version plus robuste et performante, souvent utilisée pour la gestion de flottes de véhicules et le transport.

- **Performance et Connectivité :** Il prend en charge le Dual Active LTE (sur certains modèles), permettant une connectivité simultanée à deux réseaux cellulaires pour la redondance et l'équilibrage de charge. Il dispose de 4 ports LAN Gigabit Ethernet avec prise en charge optionnelle du PoE/PoE+ (jusqu'à 30W).

- **Capteurs avancés :** Contrairement aux modèles 819, l'IR829 intègre un accéléromètre et un gyroscope pour surveiller la vitesse et le mouvement angulaire, ainsi qu'une gestion de l'alimentation liée à l'allumage du véhicule.

- **Hébergement d'applications :** Il est nativement conçu pour l'environnement Cisco IOx, permettant d'exécuter des applications à la périphérie du réseau (Edge computing).

- **Résistance :** Il supporte des températures extrêmes allant de -40°C à +60°C (testé jusqu'à +85°C).

### Routeur 819HGW

Le suffixe HGW dans son nom signifie qu'il est une version Hardened (durcie) avec Wi-Fi intégré.

- **Robustesse (Hardened) :** Le "H" indique qu'il utilise des composants de qualité industrielle pour résister aux environnements difficiles, avec une plage de température de fonctionnement allant de -25°C à 60°C.

- **Connectivité sans fil (GW) :** Le "GW" précise qu'il intègre à la fois des capacités de WAN sans fil (3G/3.7G) et de LAN sans fil (WLAN). Il possède un point d'accès Wi-Fi double radio intégré (802.11a/b/g/n).

- **Limites techniques :** Contrairement à l'IR829, ses ports LAN sont généralement de type Fast Ethernet (10/100) plutôt que Gigabit. Sa consommation électrique maximale est d'environ 20 watts.

### Routeur 819IOX

Le terme 819IOX (souvent identifié comme le modèle ISR 819HG-4G-IOX) désigne une variante du routeur 819 capable de fonctionner comme un nœud "fog".

- **Fog Computing :** Sa principale différence réside dans sa capacité à héberger des applications dans des machines virtuelles (VM) via un hyperviseur. Il utilise une distribution Linux Yocto pour exécuter des services locaux.

- **Cas d'usage :** Il est spécifiquement utilisé pour l'interaction locale avec des dispositifs industriels IoT, permettant par exemple de traduire des protocoles propriétaires en IP directement sur le routeur.

- **Ressources :** En tant que nœud "fog", il nécessite une configuration spécifique de la connectivité réseau interne pour les VM, incluant des groupes de ports virtuels (VirtualPortGroup).

### Choix 

Le routeur 829 est le meilleur choix pour notre projet car il posède des ports Gigabits qui sont utiles pour se connecter au switch, de plus il possède des charges PoE qui pourront être utilisé pour connecter les appareils du réseau VIDEO et il possède des capteurs avancés qui permettent de surveiller plus efficacement le secteur.

## Code utilisé 

### Configuration du Switch 

#### Création des VLAN, par exemple pour créer le VLAN 10 sur le switch

```text
Switch> enable
Switch# configure terminal
Switch(config)# vlan 10
Switch(config-vlan)# name "VLAN 10"
Switch(config-vlan)# exit
Switch(config)# ```

