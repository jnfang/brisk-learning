class PromptEngine(object):

    @staticmethod
    def get_prompts_and_tokens(lexile, input_text):
        MAX_PROMPT_TOKENS = 2300  # Actually 2500 but we want to be safe
        MAX_COMPLETION_TOKENS = 3800  # Actually 4000 but we want to be safe
        # lexile is a string that corresponds to the lexile level asked for by a user
        # prompt_examples is a dictionary that maps a lexile level to the formatted prompt string
        lexile = str(lexile) + "L"
        prompt_examples = PromptEngine.get_prompt_examples(lexile)
        prompt_tokens = PromptEngine.get_prompt_tokens(lexile)
        preset_prompt_str = PromptEngine.format_mapping_prompt(
            lexile, prompt_examples)
        remaining_tokens = MAX_PROMPT_TOKENS - prompt_tokens
        split_inputs = PromptEngine.split_input(input_text, remaining_tokens)
        prompts_tokens = []
        for input in split_inputs:
            prompt_str = preset_prompt_str + "Original text: " + input + \
                "\n\n\n" + "Rewritten text at " + lexile + ":\n\n\n"
            tokens_left = MAX_COMPLETION_TOKENS - \
                PromptEngine.calc_tokens(prompt_str)
            prompts_tokens.append((prompt_str, tokens_left))
        return prompts_tokens

    @staticmethod
    def get_prompt_examples(lexile):
        lit_hash = {
            "600L": PromptEngine.sample_600(),
            "700L": PromptEngine.sample_700(),
            "800L": PromptEngine.sample_800(),
            "900L": PromptEngine.sample_900(),
            "1000L": PromptEngine.sample_1000(),
            "1100L": PromptEngine.sample_1100(),
            "1200L": PromptEngine.sample_1200(),
        }
        return lit_hash[lexile]

    @staticmethod
    def get_prompt_tokens(lexile):
        token_hash = {
            "600L": 910,
            "700L": 1354,
            "800L": 1225,
            "900L": 930,
            "1000L": 1291,
            "1100L": 787,
            "1200L": 892,
        }
        return token_hash[lexile]

    @staticmethod
    def calc_tokens(prompt_string):
        return (len(prompt_string) - prompt_string.count(' ')) / 3

    @staticmethod
    def run_all(lexiles, input):
        for lex in lexiles:
            print(PromptEngine.get_prompt(lex, input))
            print("\n\n\n")

    @staticmethod
    def format_mapping_prompt(lex_level, prompt_examples):
        # lex_level is a string that corresponds to the lexile level asked for by a user
        # prompt_examples is a dictionary that maps an original text to a rewritten text at the lexile level
        prompt_str = "Here are some examples of original texts and texts that are rewritten at the specific lexile level of " + \
            lex_level + ".\n\n Lower lexiles have shorter sentences and simpler words. "
        original_text_str = "Original Text: \n"
        rewritten_text_str = "Rewritten text at " + lex_level + ": \n"
        for original in prompt_examples.keys():
            prompt_str += original_text_str + original + "\n" + \
                rewritten_text_str + prompt_examples[original] + "\n\n\n"
        return prompt_str

    @staticmethod
    def sample_600():
        original_text1 = """
        SACRAMENTO, California — California set itself on a path on August 25, 2022, to end the
        era of gas-powered cars, with air regulators adopting the world's most stringent rules for transitioning to 
        zero-emission vehicles.
        The move by the California Air Resources Board to have all new cars, pickup trucks, and sport utility vehicles
        (SUVs) be electric or hydrogen by 2035 is likely to reshape the U.S. auto market, which gets 10 percent of its
        sales from the nation's most populous state.
        But such a radical transformation in what people drive will also require at least 15 times more vehicle chargers 
        statewide, a more robust energy grid, and vehicles that people of all income levels can afford.
        "It's going to be very hard getting to 100 percent," said Daniel Sperling, a board member and founding director
        of the Institute of Transportation Studies at the University of California, Davis. "You can't just wave your wand, 
        you can't just adopt a regulation — people actually have to buy them and use them," Sperling said."""
        sample_text1 = """
        California wants its drivers to stop using gas-powered cars. It has the world's toughest rules for moving to
        zero-emission vehicles. Zero emission means that a vehicle will not make the environment dirty.
        California's governor wants all new vehicles to be electric- or hydrogen-powered. He wants this by 2035. But the 
        state will need 15 times more vehicle chargers. Chargers are like gas stations. They are where electric vehicles 
        plug in to get their energy.
        "It's going to be very hard getting to 100 percent," said Daniel Sperling. He is a founder of the Institute of 
        Transportation Studies. This is at the University of California, Davis. Sperling said there is no quick fix."""
        original_text2 = """
        LONDON, England — There are a number of ways to turn heads in a neighborhood: covering every inch of your home 
        with black and white doodles is certainly one of them.
        British artist Sam Cox, 28, says he has fulfilled a childhood dream by transforming his home into a quirky work 
        of art and covering it with monochrome, free-flowing drawings.
        "I've always wanted to live in a completely doodled house," he told the Washington Post. "It feels the most natural 
        way to create art for me, and the most instinctive process when I pick up a pen and just start drawing."
        """
        sample_text2 = """
        Sam Cox is an artist. Recently, he covered his home in black and white doodles. It was his childhood dream come true!
        He loved to draw as a kid. He covered hundreds of papers in his scribbles. But he wanted to do something more. He 
        wanted to live inside of his own art.
        So he asked his parents if he could start doodling on furniture and his bedroom walls. At first, they said no. 
        But after a while his parents let him. Cox says doodling is "the most natural way to create art."
        """
        return {original_text1: sample_text1, original_text2: sample_text2}

    @staticmethod
    def sample_700():
        original_text1 = """
        And Gienger had to keep a close eye on the weather. If heavy rain came through, Maverick had to be covered in plastic 
        so it wouldn't drown. If it was too sunny, Gienger had to shade the fruit to cool it off and prevent it from maturing 
        too early. Extreme weather could also burn or rot Maverick.
        Gienger also has to take into account Minnesota's cold falls. "This year we had to put plastic on top of this ginormous 
        plant to keep it from freezing," Gienger told the Post.
        Gienger watched Maverick's rapid growth with amazement. He took regular pictures of his now 15-month-old daughter atop 
        or beside the squash, informally measuring her growth with the pumpkin's. He took its dimensions regularly to have an 
        idea of how much it might weigh. Gienger has a formula for this and does not keep a record of measurements. "It's all 
        in my head," he said.
        On October 8, a group of family members and friends arrived at his backyard to put straps around Maverick and use a 
        forklift to place it on a pallet with foam and eventually drop it into a dumpster that would travel over 2,000 miles 
        (3,219 kilometers) attached to a trailer.
        Once a giant pumpkin is detached from the soil, it can lose several pounds before it reaches the scale. Maverick was 
        covered with wet blankets to keep it hydrated by the time it arrived at Half Moon Bay. Even if Maverick lost some 
        weight in transit, it still took home the victory.
        It then sat in Half Moon Bay on display.
        "This thing will have a great life," Gienger said.
        """
        sample_text1 = """
        Gienger also watched the weather. If it was too hot, Maverick could burn, so Gienger would shade the fruit to cool 
        it off. And Minnesota gets cold in the fall. He put plastic on the plant to keep it from freezing, Gienger said.
        On October 8, family members and friends arrived at Gienger's backyard. They put straps around Maverick. Then 
        they used a forklift to place the pumpkin on a flat platform with foam to protect it. They dropped it into a 
        dumpster. It would travel over 2,000 miles (3,219 kilometers) to California attached to a trailer. Maverick was 
        covered with wet blankets to keep it from losing too much water during the trip.
        After the big win, Maverick went on display in California. Then, Gienger brought the pumpkin back home to Anoka. 
        It was carved into an eagle, in an attempt to make the largest jack-o'-lantern in the world.
        """
        original_text2 = """
        That Harry and Hermione know that 4 - 1 = 3 is no surprise. But Harry and Hermione aren't the characters in the 
        Harry Potter stories. They're stingrays! Stingrays are wide, flat-bodied fish related to sharks. And they can do 
        this kind of math too.
        Scientists from the University of Bonn in Germany wanted to know if fish could do simple math. They tested stingrays. 
        They also tested cichlids. This is a type of popular aquarium fish.
        Seeing if the fish could do math is all about rewarding them. It's a bit like training a dog. The trainer rewards the 
        animal for doing what the trainer wants. Many times, the reward is a piece of food.
        "So if they do something right, they get a treat," said zoologist Vera Schluessel. Zoologists are scientists who 
        study animals. Schluessel led the study on fish math. In this case, the treats were food pellets for the cichlids. 
        The stingrays got tasty earthworms, shrimp or mussels instead.
        """
        sample_text2 = """
        It's no shocker that Harry and Hermione would know that 4 - 1 = 3. But what if I told you that this Harry and Hermione 
        aren't characters in Harry Potter stories — they're stingrays. And they can still do this type of math.
        A study from Germany's University of Bonn tested the mathematical abilities of several freshwater stingrays named after 
        Harry Potter characters. They also tested a type of African fish called a cichlid, and they were given names such as 
        Jennifer and Tiffany.
        Seeing if the fish could do math was similar to training a dog.
        "You provide a reward system," said zoologist and study co-author Vera Schluessel. "So if they do something right, 
        they get a treat." In this case, the treats were food pellets for the cichlids and earthworms, shrimp or mussels for the stingrays.
        """
        return {original_text1: sample_text1, original_text2: sample_text2}

    @staticmethod
    def sample_800():
        original_text1 = """
        Whenever November would roll around, James Gensaw, a Yurok language high school teacher in far Northern California, 
        would get a request from a school administrator. They would always ask him to bring students from the Native American 
        Club, which he advises, to demonstrate Yurok dancing on the high school quad at lunch time.
        "On the one hand, it was nice that the school wanted to have us share our culture," Gensaw told me during an interview. 
        "On the other, it wasn't always respectful. Some kids would make fun of the Native American dancers, mimicking war cries 
        and calling out 'chief.'"
        """
        sample_text1 = """
        James Gensaw is a high school teacher in California. He teaches the Yurok language. 
        This is the language spoken by the Yurok people, who have lived in California for many 
        hundreds of years. Gensaw also advises the Native American Club. For years, his school 
        asked for the same thing every November. It asked him to have students from the club 
        perform Yurok dancing outside the school at lunch.
        "On the one hand, it was nice that the school wanted to have us share our culture," 
        Gensaw says. "On the other, it wasn't always respectful. Some kids would make fun of 
        the Native American dancers, mimicking war cries and calling out 'chief.'"
        """
        original_text2 = """
        Freshwater crayfish have inhabited New Zealand for millions of years. They have dark, 
        hard and mottled shells, allowing them to blend in with logs and mud as they seek cover 
        from predators. At night the crustaceans search for food, their strong pincers finding and 
        cutting up fish, mayflies, plants and snails. They are known here as kōura, a name given 
        to them by the Māori, the Indigenous Polynesian people who first arrived in New Zealand in 
        the 1300s and who now comprise more than 15 percent of the country's population.
        For Māori, the crayfish are economically and culturally significant, both as a delicacy and as 
        part of a traditional value called mahinga kai, which upholds the importance of natural foods, 
        their ecosystems, and the practices of gathering and sustaining them.
        Today, kōura populations are on the decline and are considered at risk of becoming threatened 
        due to habitat loss, overfishing, and poor water quality. Makarini Rupene, a mahinga kai expert 
        and cultural land management adviser with the local government of Canterbury, has watched this 
        decline in the country's South Island. "I was brought up fishing on the rivers, the lakes, the 
        coastline, the ocean," he said. As a child in the 1970s and '80s, he learned traditional practices 
        and their relationship with mahinga kai. Now when he returns to the waters of his childhood, he 
        finds few crayfish.
        """
        sample_text2 = """
        Freshwater crayfish have lived in New Zealand for millions of years. The crayfish have dark, hard shells with spots. 
        They hide in mud. Crayfish search for food at night. Their strong pincers cut up fish, mayflies, plants and snails.
        Māori are the Indigenous Polynesian people who first arrived in New Zealand in the 1300s. The crayfish are important 
        to the Māori people. They call crayfish kōura. The crayfish are a delicacy. But they are also part of a traditional 
        value called mahinga kai. This value upholds the importance of natural foods and the places in which they are found. 
        It is also about the practice of gathering those foods and sustaining them.
        Makarini Rupene is a mahinga kai expert. He is also the cultural land management adviser with the local government 
        of Canterbury. He grew up fishing and learning traditional practices and their relationship with mahinga kai. These 
        days, when he returns to the waters of his childhood, he finds few crayfish. The kōura populations are declining. 
        This is due to habitat loss, overfishing and poor water quality.
        """
        return {original_text1: sample_text1, original_text2: sample_text2}

    @staticmethod
    def sample_900():
        original_text1 = """
        FORT MYERS BEACH, Florida — The seafood industry in southwest Florida has been racing against time and 
        the elements to save what's left of a major shrimping fleet — and a lifestyle — that was battered this 
        fall by Hurricane Ian.
        The storm's ferocious wind and powerful surge hurled a couple dozen shrimp boats atop wharves and homes 
        along the harbor on Estero Island. Jesse Clapham, who oversees a dozen trawlers for a large seafood 
        company at Fort Myers Beach, is trying to get boats back to sea as quickly as possible — before their 
        engines, winches and pulleys seize up from being out of the water.
        """
        sample_text1 = """
        The seafood industry in southwest Florida has been racing against time and the weather. Its shrimping 
        boats and way of life were battered this fall by Hurricane Ian.
        The storm's fierce wind and strong waves tossed a couple dozen shrimp boats atop wharves and homes 
        along the harbor on Estero Island. A wharf is like a big dock sticking out into the water, where boats 
        can tie up or unload. Jesse Clapham oversees a dozen trawlers for a large seafood company at Fort Myers Beach. 
        Trawlers are boats that drag a net through the water to catch seafood. He is trying to get boats back to sea as 
        quickly as possible. Their moving parts will jam if they're out of the water for too long.
        """
        original_text2 = """
        CHURDAN, Iowa — In the 1970s, when George Naylor said he wanted to grow organic crops, the idea didn't go over well.
        Back then organic crops were an oddity, destined for health food stores or maybe a few farmers markets.
        "I told my dad I wanted to be an organic farmer and he goes, 'Ha, ha, ha,'" Naylor said, noting it wasn't 
        until 2014 that he could embrace his dream and begin transitioning from standard to organic crops.
        But over the decades, something unexpected happened — demand for organics started increasing so fast that 
        it began outstripping the supply produced in the United States.
        Now a new challenge has emerged: It's not getting consumers to pay the higher prices, it's convincing enough 
        farmers to get past their organic reluctance and start taking advantage of the revenue pouring in.
        """
        sample_text2 = """
        In the 1970s, George Naylor said he wanted to grow organic food on his Iowa farm. His neighbors thought the idea 
        was pretty strange. Back then, organic crops were an oddity. Health food stores or maybe a few farmers markets were 
        the only places they were sold.
        "I told my dad I wanted to be an organic farmer, and he goes, 'Ha, ha, ha,'" Naylor said. It wasn't until 2014 that 
        he could begin growing organic crops.
        Over the decades, something unexpected happened. Demand for organics started increasing so fast that it outgrew the 
        supply in the United States.
        Now a new challenge has emerged. It's not getting consumers to pay the higher prices. It is convincing enough 
        farmers to grow organic crops.
        """
        return {original_text1: sample_text1, original_text2: sample_text2}

    @staticmethod
    def sample_1000():
        original_text1 = """
        CHURDAN, Iowa — In the 1970s, when George Naylor said he wanted to grow organic crops, the idea didn't go over well.
        Back then organic crops were an oddity, destined for health food stores or maybe a few farmers markets.
        "I told my dad I wanted to be an organic farmer and he goes, 'Ha, ha, ha,'" Naylor said, noting it wasn't 
        until 2014 that he could embrace his dream and begin transitioning from standard to organic crops.
        But over the decades, something unexpected happened — demand for organics started increasing so fast that 
        it began outstripping the supply produced in the United States.
        Now a new challenge has emerged: It's not getting consumers to pay the higher prices, it's convincing enough 
        farmers to get past their organic reluctance and start taking advantage of the revenue pouring in.
        """
        sample_text1 = """
        In the 1970s, George Naylor said he wanted to grow organic crops on his farm in Iowa. The idea did not go over well with everyone.
        Back then, organic crops were an oddity. They were destined for health food stores or maybe a few farmers markets.
        "I told my dad I wanted to be an organic farmer, and he goes, 'Ha, ha, ha,'" Naylor said. It was not until 2014 that 
        Naylor said he could begin transitioning from standard to organic crops.
        But over the decades, something unexpected happened. Demand for organics started increasing so fast that it began 
        outstripping the supply in the United States.
        Now a new challenge has emerged. It's not getting consumers to pay higher prices. It's convincing enough farmers to 
        get past their reluctance to grow organic crops.
        """
        original_text2 = """
        Freshwater crayfish have inhabited New Zealand for millions of years. They have dark, 
        hard and mottled shells, allowing them to blend in with logs and mud as they seek cover 
        from predators. At night the crustaceans search for food, their strong pincers finding and 
        cutting up fish, mayflies, plants and snails. They are known here as kōura, a name given 
        to them by the Māori, the Indigenous Polynesian people who first arrived in New Zealand in 
        the 1300s and who now comprise more than 15 percent of the country's population.
        For Māori, the crayfish are economically and culturally significant, both as a delicacy and as 
        part of a traditional value called mahinga kai, which upholds the importance of natural foods, 
        their ecosystems, and the practices of gathering and sustaining them.
        Today, kōura populations are on the decline and are considered at risk of becoming threatened 
        due to habitat loss, overfishing, and poor water quality. Makarini Rupene, a mahinga kai expert 
        and cultural land management adviser with the local government of Canterbury, has watched this 
        decline in the country's South Island. "I was brought up fishing on the rivers, the lakes, the 
        coastline, the ocean," he said. As a child in the 1970s and '80s, he learned traditional practices 
        and their relationship with mahinga kai. Now when he returns to the waters of his childhood, he 
        finds few crayfish.
        """
        sample_text2 = """
        Freshwater crayfish have dark, hard shells with spots. They hide in the mud. At night the crayfish search for food, their 
        strong pincers finding and cutting up fish, mayflies, plants, and snails. Crayfish have lived in New Zealand for millions of years.
        The Māori are the Indigenous Polynesian people who first arrived in New Zealand in the 1300s. They call freshwater crayfish 
        kōura. For Māori, the crayfish are economically and culturally significant. Crayfish are a delicacy. And they are part of a 
        traditional value called mahinga kai. This value upholds the importance of natural foods, the places in which they are found, 
        and the practices of gathering and sustaining them.
        Makarini Rupene is a mahinga kai expert and cultural land management adviser with the local government of Canterbury. He grew 
        up fishing and learning traditional practices and their relationship with mahinga kai. When Rupene returns to the waters of 
        his childhood, he finds few crayfish. Kōura populations are declining due to habitat loss, overfishing and poor water quality.
        """
        return {original_text1: sample_text1, original_text2: sample_text2}

    @staticmethod
    def sample_1100():
        original_text1 = """
        Whenever November would roll around, James Gensaw, a Yurok language high school teacher in far Northern California, 
        would get a request from a school administrator. They would always ask him to bring students from the Native American 
        Club, which he advises, to demonstrate Yurok dancing on the high school quad at lunch time.
        "On the one hand, it was nice that the school wanted to have us share our culture," Gensaw told me during an interview. 
        "On the other, it wasn't always respectful. Some kids would make fun of the Native American dancers, mimicking war cries 
        and calling out 'chief.'"
        """
        sample_text1 = """
        James Gensaw is a Yurok language high school teacher in California. For years, his school would request the same thing 
        every November. It would always ask him to have students from the Native American Club, which he advises, perform Yurok 
        dancing in a yard outside the school at lunch.
        "On the one hand, it was nice that the school wanted to have us share our culture," Gensaw says. "On the other, it 
        wasn't always respectful. Some kids would make fun of the Native American dancers, mimicking war cries and calling out 
        'chief.'"
        """
        original_text2 = """
        The idea for the monument started six years ago after a small group of Buffalo-area residents told New York Assembly 
        Majority Leader Crystal Peoples-Stokes they hoped to locate some land to build a park to honor Black service members.
        "She got the land donated from the city, started a committee and put me on it," said Madeline O. Scott, 87, a Black 
        amateur historian whose ancestors served in the Civil War.
        Scott said she regularly scans obituaries for the names of deceased Black military veterans from western New York, and 
        she was excited to finally have a way to honor them for their service and thank those still on active duty.
        """
        sample_text2 = """
        The idea for the monument started six years ago. A small group of Buffalo-area residents spoke to New York Assembly 
        Majority Leader Crystal Peoples-Stokes. They told Peoples-Stokes that they hoped to locate some land to build a park 
        to honor Black service members.
        "She got the land donated from the city, started a committee, and put me on it," said 87-year-old Madeline O. Scott. 
        She is a Black amateur historian whose ancestors served in the Civil War.
        Scott said she regularly scans obituaries for the names of deceased Black military veterans from western New York. She 
        was excited to have a way to finally honor them for their service.
        """
        return {original_text1: sample_text1, original_text2: sample_text2}

    @staticmethod
    def sample_1200():
        original_text1 = """
        CHURDAN, Iowa — In the 1970s, when George Naylor said he wanted to grow organic crops, the idea didn't go over well.
        Back then organic crops were an oddity, destined for health food stores or maybe a few farmers markets.
        "I told my dad I wanted to be an organic farmer and he goes, 'Ha, ha, ha,'" Naylor said, noting it wasn't 
        until 2014 that he could embrace his dream and begin transitioning from standard to organic crops.
        But over the decades, something unexpected happened — demand for organics started increasing so fast that 
        it began outstripping the supply produced in the United States.
        Now a new challenge has emerged: It's not getting consumers to pay the higher prices, it's convincing enough 
        farmers to get past their organic reluctance and start taking advantage of the revenue pouring in.
        """
        sample_text1 = """
        In the 1970s, when George Naylor of Iowa said he wanted to grow organic crops, the idea didn't go over well. Back then, 
        organic crops were an oddity, destined for health food stores or maybe a few farmers markets.
        "I told my dad I wanted to be an organic farmer and he goes, 'Ha, ha, ha,'" Naylor said. He noted it wasn't until 
        2014 that he could embrace his dream and begin transitioning from standard to organic crops.
        But over the decades, something unexpected happened. Demand for organics started increasing so fast that it began 
        outstripping the supply produced in the United States.
        Now a new challenge has emerged: It isn't getting consumers to pay the higher prices. It's convincing enough farmers 
        to get past their organic reluctance and start taking advantage of the revenue pouring in.

        """
        original_text2 = """
        Whenever November would roll around, James Gensaw, a Yurok language high school teacher in far Northern California, 
        would get a request from a school administrator. They would always ask him to bring students from the Native American 
        Club, which he advises, to demonstrate Yurok dancing on the high school quad at lunch time.
        "On the one hand, it was nice that the school wanted to have us share our culture," Gensaw told me during an interview. 
        "On the other, it wasn't always respectful. Some kids would make fun of the Native American dancers, mimicking war cries 
        and calling out 'chief.'"
        """
        sample_text2 = """
        James Gensaw is a Yurok language high school teacher in far Northern California. For years, school administrators would 
        request the same thing from him every November. They would always ask him to bring students from the Native American Club, 
        which he advises, to demonstrate Yurok dancing on the high school quad at lunch.
        "On the one hand, it was nice that the school wanted to have us share our culture," Gensaw told me during an interview. 
        "On the other, it wasn't always respectful. Some kids would make fun of the Native American dancers, mimicking war cries 
        and calling out 'chief.'"
        """
        return {original_text1: sample_text1, original_text2: sample_text2}

    @staticmethod
    def ta_prompt():
        return """You are a virtual TA demo called Brisk that can do whatever a teacher 
        asks within reason. Your primary objective is to convince users you have 
        the capability to do whatever command they ask you. You can do 
         queries like pulling data from one integration and using 
        it to complete a task in another. Before you pretend to take an action, you
        should confirm with the teacher that you should take said action.
     
        You are integrated with Google Classroom, Google Calendar, Google Drive, Google
        Docs, Google Slides, Google Sheets, Google Meet, Powerschool, Aries, Remind, 
        Zoom, Schoology, Clever, Youtube, Wikipedia, Data, Curriculum.

        Google Classroom, Schoology, and Canvas are learning management systems. 
        Teachers can use learning management systems to:
        1. Assign assignments like resources, activities (e.g. worksheets), and assessments (e.g. quizzes,
        exams, final projects).
        2. Grade or provide feedback on assignments
        3. Exempt students from assignments
        Assume teacher wants to use Google Classroom unless otherwise specified.

        Powerschool and Aries are student information systems which allows teachers to mark students 
        as absent or late, and mark grades. Data available, student information, parent contact information including
        email, absents, tardies, and grades. Assume powerschool is the SIS system used.

        Remind is a parent-teacher communication application.

        Clever allows teachers to make enrollment changes like adding/removing students from a course.

        Youtube is a place for video resources. Wikipedia is a place for text resources. You can search both.

        Data is a way to create charts and graphs based on data from other tools.

        Curriculum is a tool that allows you to create or modify curriculum content based on what the teacher asks. After
        the teacher approves the curriculum, you can create a new Google Doc, Slide or sheet with that content.

        The students in the class are: Allison Whalen, Charlie Guo, Natasha 
        Ashai, Elizabeth Folsom, and Rohan Shah, Robin Callison, Robert Castlerock, Jimmy Clay. When you don't 
        have the tools to address a certain problem, just say you can't yet do the task.

        If an action requires generating content, end response with prompt(s) for a subsequent 
        request that is wrapped in //P// Tool: example prompt //P//. Cases include
        generating or modifying curriculum (resources, activities, assessments) or drafting messages (remind, gmail).
        
        Example:

        Teacher prompt:
        "for students who are absent, send an email to their parents with links to the assignments we covered today?"

        Response:
        Okay, I will send an email to absent students' parents with assignments in Google Classrom that were covered.
        //P// Powerschool: Query for students who were absent today... \n
        //P// Google Classroom: Look for assignments that were assigned today... \n
        //P// Gmail: Draft an email to parents explaining the assignments that were covered today...\n

        Teacher Prompt: {input}
        
        Response:
        """

    # TODO: will need to add more splitting if the paragraphs are still too long
    @staticmethod
    def split_input(input_text, remaining_tokens):
        splits = input_text.split("\n")
        split_texts = [""]
        current_token_sum = 0
        for piece in splits:
            piece_tokens = PromptEngine.calc_tokens(piece)
            current_token_sum += piece_tokens
            if current_token_sum > remaining_tokens:
                split_texts.append(piece)
                current_token_sum = piece_tokens
            else:
                split_texts[-1] += "\n" + piece
        return split_texts
