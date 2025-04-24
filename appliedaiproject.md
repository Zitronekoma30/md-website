# Impact of GDP per capita on Olympic Performance (1991-2020)
*------- University ------- - Applied AI with Python WS24/25 - Leon -------*

## Abstract
This analysis explores the correlation between GDP per capita (adjusted for purchasing power parity) and Olympic performance across various categories. Towards this end, we evaluate the correlation of current GDP with overall performance since 1990, examine how GDP impacts performance in specific sports categories, and investigate whether GDP trends can predict the performance of key countries.

While a positive correlation is observed, GDP per capita (PPP) alone is not a strong predictor of overall Olympic success. However, notable relationships between GDP and performance may offer insight on broader factors influencing both economic development as well as athletic success.

Overall, these findings lay bare some useful trends but highlight the need for further analysis beyond only economic data such as population size and cultural factors.
## Additional Information
Plot two sorts of every performance into GDP categories based on the relevant athlete's nation's distance to that year's global average GDP per capita (PPP). Towards this end, a GDP score is calculated for each showing at the games, with 1 representing the exact global average. As mentioned on the poster, 0.7 (70%) is the lower bound for the average GDP category, while 1.5 (150%) forms the upper bound. This is done to make sure the different showings at the games are comparable over time, such that a high GDP showing from 1991 is not miscategorized as low GDP due to factors such as the overall global economic growth or inflation.

Plot two and four both make use of sport categories; these are defined as follows:
```python
speed_endurance_precision_mapping = {
    'Sprinting': 'Speed',
    'Cycling': 'Speed',
    'Speed Skating': 'Speed',
    'Short Track Speed': 'Speed',
    'Athletics': 'Speed',
    'Short Track Speed Skating': 'Speed',

    'Marathon': 'Endurance',
    'Triathlon': 'Endurance',
    'Rowing': 'Endurance',
    'Swimming': 'Endurance',
    'Canoeing': 'Endurance',
    'Cross Country Skiing': 'Endurance',
    'Weightlifting': 'Endurance',

    'Archery': 'Precision',
    'Shooting': 'Precision',
    'Golf': 'Precision',

    'Basketball': 'Team',
    'Football': 'Team',
    'Ice Hockey': 'Team',
    'Volleyball': 'Team',
    'Handball': 'Team',
    'Water Polo': 'Team',
    'Rugby Sevens': 'Team',
    'Baseball': 'Team',
    'Softball': 'Team',
    'Tennis': 'Team',
    'Beach Volleyball': 'Team',
    'Hockey': 'Team',

    'Gymnastics': 'Skill-Based',
    'Rhythmic Gymnastics': 'Skill-Based',
    'Trampolining': 'Skill-Based',
    'Diving': 'Skill-Based',
    'Equestrianism': 'Skill-Based',
    'Figure Skating': 'Skill-Based',
    'Modern Pentathlon': 'Skill-Based',
    'Table Tennis': 'Skill-Based',
    'Badminton': 'Skill-Based',
    'Sailing': 'Skill-Based',
    'Synchronized Swimming': 'Skill-Based',

    'Alpine Skiing': 'Winter',
    'Freestyle Skiing': 'Winter',
    'Snowboarding': 'Winter',
    'Ski Jumping': 'Winter',
    'Bobsleigh': 'Winter',
    'Luge': 'Winter',
    'Skeleton': 'Winter',
    'Nordic Combined': 'Winter',
    'Curling': 'Winter',
    'Biathlon': 'Winter',

    'Judo': 'Combat',
    'Taekwondo': 'Combat',
    'Boxing': 'Combat',
    'Wrestling': 'Combat',
    'Fencing': 'Combat',
}
```
## Sources
- [GDP per capita dataset](https://www.kaggle.com/datasets/nitishabharathi/gdp-per-capita-all-countries)
## Poster
![[v2-3.png]]