import { Tabs } from "radix-ui";

type TabsProps = {
  tabsList: string[];
  tabsContent: React.ReactNode[];
};

export default function TabsUI({ tabsList, tabsContent }: TabsProps) {
  return (
    <Tabs.Root className="relative w-[440px] p-10">
      <Tabs.List className="flex gap-8 text-text mb-6">
        {tabsList.map((item, index) => {
          return (
            <Tabs.Trigger
              key={item}
              value={"Tab" + index}
              className="pb-2 border-b-4 border-transparent text-[1.25em] text-text font-bold data-[state=active]:border-brand-2 data-[state=active]:text-brand-2 focus:outline-0 cursor-pointer transition-all duration-300"
            >
              {item}
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>

      {tabsContent.map((item, index) => {
        return (
          <Tabs.Content
            key={index}
            value={"Tab" + index}
            className="w-full mt-2 text-[0.9em] text-text/80 data-[state=active]:animate-fadeIn data-[state=inactive]:animate-fadeOut"
          >
            {item}
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
