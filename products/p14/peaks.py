"""Peak lists for p14. Checked 2026-11-04.
Colorado: 14ers.com peak list (all 58 named 14ers, elevations in ft as 14ers.com gives them; unranked marked u).
NH: AMC Four Thousand Footer Committee list of 48, elevations exactly as amc4000footer.org gives them.
ADK: Adirondack Forty-Sixers list of 46 (traditional elevations used by the club; four are below 4,000 ft by later surveys)."""
CO = [  # range, name, ft, unranked
("Sawatch","Mount Elbert",14438,0),("Sawatch","Mount Massive",14427,0),("Sawatch","Mount Harvard",14424,0),
("Sangre de Cristo","Blanca Peak",14350,0),("Sawatch","La Plata Peak",14344,0),("San Juan","Uncompahgre Peak",14318,0),
("Sangre de Cristo","Crestone Peak",14299,0),("Mosquito","Mount Lincoln",14293,0),("Front","Grays Peak",14275,0),
("Elk","Castle Peak",14274,0),("Tenmile","Quandary Peak",14272,0),("Front","Torreys Peak",14272,0),
("Sawatch","Mount Antero",14271,0),("Front","Mount Blue Sky",14268,0),("Front","Longs Peak",14259,0),
("San Juan","Mount Wilson",14256,0),("Mosquito","Mount Cameron",14248,1),("Sawatch","Mount Shavano",14230,0),
("Sawatch","Mount Belford",14202,0),("Sawatch","Mount Princeton",14200,0),("Sawatch","Mount Yale",14200,0),
("Sangre de Cristo","Crestone Needle",14196,0),("Mosquito","Mount Bross",14178,0),("San Juan","El Diente Peak",14175,1),
("Sangre de Cristo","Kit Carson Peak",14167,0),("Elk","Maroon Peak",14163,0),("Sawatch","Mount Oxford",14158,0),
("Sawatch","Tabeguache Peak",14158,0),("San Juan","Mount Sneffels",14155,0),("Mosquito","Mount Democrat",14154,0),
("Elk","Capitol Peak",14138,0),("Front","Pikes Peak",14109,0),("Elk","Snowmass Mountain",14105,0),
("San Juan","Windom Peak",14089,0),("San Juan","Mount Eolus",14087,0),("Sangre de Cristo","Challenger Point",14086,1),
("Sawatch","Mount Columbia",14075,0),("Sawatch","Missouri Mountain",14071,0),("Sangre de Cristo","Humboldt Peak",14068,0),
("Front","Mount Bierstadt",14066,0),("San Juan","Sunlight Peak",14061,0),("San Juan","Handies Peak",14058,0),
("Sangre de Cristo","Ellingwood Point",14057,0),("Sangre de Cristo","Mount Lindsey",14055,0),("Sangre de Cristo","Culebra Peak",14053,0),
("Mosquito","Mount Sherman",14043,0),("San Juan","North Eolus",14042,1),("Sangre de Cristo","Little Bear Peak",14041,0),
("San Juan","Redcloud Peak",14037,0),("Elk","Conundrum Peak",14037,1),("Elk","Pyramid Peak",14029,0),
("San Juan","San Luis Peak",14023,0),("Elk","North Maroon Peak",14022,1),("San Juan","Wetterhorn Peak",14021,0),
("San Juan","Wilson Peak",14021,0),("Sawatch","Mount of the Holy Cross",14007,0),("Sawatch","Huron Peak",14006,0),
("San Juan","Sunshine Peak",14004,0),
]
NH = [("Washington",6288),("Adams",5774),("Jefferson",5712),("Monroe",5384),("Madison",5367),("Lafayette",5260),
("Lincoln",5089),("South Twin",4902),("Carter Dome",4832),("Moosilauke",4802),("Eisenhower",4780),("North Twin",4761),
("Carrigain",4700),("Bond",4698),("Middle Carter",4610),("West Bond",4540),("Garfield",4500),("Liberty",4459),
("South Carter",4430),("Wildcat",4422),("Hancock",4420),("South Kinsman",4358),("Field",4340),("Osceola",4340),
("Flume",4328),("South Hancock",4319),("Pierce",4310),("North Kinsman",4293),("Willey",4285),("Bondcliff",4265),
("Zealand",4260),("North Tripyramid",4180),("Cabot",4170),("East Osceola",4156),("Middle Tripyramid",4140),
("Cannon",4100),("Hale",4054),("Jackson",4052),("Tom",4051),("Wildcat D",4050),("Moriah",4049),("Passaconaway",4043),
("Owl's Head",4025),("Galehead",4024),("Whiteface",4020),("Waumbek",4006),("Isolation",4004),("Tecumseh",4003)]
ADK = [("Mount Marcy",5344),("Algonquin Peak",5114),("Mount Haystack",4960),("Mount Skylight",4924),("Whiteface Mountain",4867),
("Dix Mountain",4857),("Gray Peak",4840),("Iroquois Peak",4840),("Basin Mountain",4827),("Gothics",4736),("Mount Colden",4714),
("Giant Mountain",4627),("Nippletop",4620),("Santanoni Peak",4607),("Mount Redfield",4606),("Wright Peak",4580),
("Saddleback Mountain",4515),("Panther Peak",4442),("Table Top Mountain",4427),("Rocky Peak Ridge",4420),("Macomb Mountain",4405),
("Armstrong Mountain",4400),("Hough Peak",4400),("Seward Mountain",4361),("Mount Marshall",4360),("Allen Mountain",4340),
("Big Slide Mountain",4240),("Esther Mountain",4240),("Upper Wolfjaw Mountain",4185),("Lower Wolfjaw Mountain",4175),
("Street Mountain",4166),("Phelps Mountain",4161),("Donaldson Mountain",4140),("Seymour Mountain",4120),("Sawteeth",4100),
("Cascade Mountain",4098),("South Dix",4060),("Porter Mountain",4059),("Mount Colvin",4057),("Mount Emmons",4040),
("Dial Mountain",4020),("Grace Peak",4012),("Blake Peak",3960),("Cliff Mountain",3960),("Nye Mountain",3895),("Couchsachraga Peak",3820)]
def m(ft): return round(ft*0.3048)
