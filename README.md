# Resume Roast

## Inspiration 💡
As Canadians, the Drake and Kendrick beef hit us hard. But not as hard as the current job market. Working on resumes has gotten so draining that it inspired us to come up with a fun and engaging alternative. Our project aims to bring some life back into the job seeking community.

## What it does 🤖
Resume Roast takes the user's resume, and uses AI to generate a track by Drake, which disses the user's resume in a personalized and playful manner. Drake will lay down some smooth bars and sharp lyrics highlighting the weaknesses t in your resume. After listening to the exceptional track by Toronto's very own, the user is then prompted to "fix their resume." They are then treated to yet another musical masterpiece by Drizzy's biggest rival, Kendrick Lamar. Kendrick will deliver a powerful, motivational performance, walking you through constructive criticisms and offering actionable advice for improving your resume. Set to an iconic beat, Kendrick’s lyrical guidance will highlight your resume’s strengths and suggest ways to enhance its content, structure, and overall impact.

## How we built it 🛠️
The frontend was built with React, Tailwind, and JavaScript. Our backend used Node.js, Google AI Studio to generate lyrics, and Elevenlabs API to generate the Drake and Kendrick vocals. Github for version control.

## Challenges we ran into 🚧
It was difficult to extract data from the PDF submissions without having the file stored locally anywhere. It took us a while to find the necessary libraries for our needs.

We also had trouble merging the audio files for the vocals and the backing tracks into one file that the user could download. Again, we found the Crunker library which gave us the various audio functions that we implemented.

## Accomplishments that we're proud of 🏆
We're proud of how accurate we got the AI voices. It was surprising how good we were able to train the models to sound just like Drake and Kendrick.

Additionally, the prompts we created to give to Google AI Studio took a lot of thought and fine tuning to ensure the AI would generate accurate and good responses.

## What we learned 📚
We learned a lot about handling different file types in Javascript (pdf as well as audio), improved our proficiency in React, and learned more about working in a team.

## What's next for Resume Roast ⏭️
Improving the synchronization of the Drake vocals with the backing beat. This means matching up the AI vocals with the BPM of the track.


## Team Members 🧑
Matthew Frieri,
Nickrod Basiri,
Nicholas Karantakis
