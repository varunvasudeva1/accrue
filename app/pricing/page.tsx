import Card from "@/components/Card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Accrue",
  description: "Supercharge and centralize your project planning with Accrue.",
};

export default async function Index() {
  return (
    <div className="flex flex-col items-start justify-start w-full space-y-4">
      <h3 className="font-bold text-4xl lg:text-5xl text-purple-200 pb-2">
        pricing
      </h3>
      <p className="text-lg text-white leading-relaxed">
        Accrue is free to use, but we offer premium features for a monthly
        subscription.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-8 self-center">
        <Card className="bg-zinc-900 border border-gray-200 border-opacity-30">
          <h3 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-300 to-violet-200 text-2xl lg:text-3xl lg:m-1 text-center font-semibold">
            free
          </h3>
          <h4 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-300 to-violet-200 text-lg lg:text-xl text-center mb-2 font-semibold">
            $0/mo
          </h4>
          <ul className="list-disc list-inside text-gray-300 text-md lg:text-lg font-medium max-w-md lg:max-w-lg xl:max-w-xl min-w-full font-mono space-y-2 mt-4">
            <li>Limit of 4 projects</li>
            <li>10MB storage limit</li>
            <li>Mistral 7B inference</li>
            <li>Chat with project suggestions</li>
          </ul>
        </Card>
        <Card className="bg-zinc-900 border border-gray-200 border-opacity-30">
          <h3 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-violet-300 text-2xl lg:text-3xl lg:m-1 text-center font-semibold">
            pro
          </h3>
          <h4 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-violet-300 text-lg lg:text-xl text-center mb-2 font-semibold">
            coming soon
          </h4>
          <p className="text-gray-300 text-center text-lg lg:text-xl font-medium mb-4 max-w-md">
            Everything in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-300 to-violet-200 font-bold">
              free
            </span>
            , plus:
          </p>
          <ul className="list-disc list-inside text-gray-300 text-md lg:text-lg font-medium max-w-md lg:max-w-lg xl:max-w-xl min-w-full font-mono space-y-2 mt-4">
            <li>Unlimited projects</li>
            <li>1GB storage limit</li>
            <li>Model-switching capabilities</li>
            <li>Local LLM inference</li>
            <li>GPT-3.5-Turbo/Mistral 8x7B inference</li>
            <li>Collaborate with up to 5 people</li>
            <li>Retrieval-augmented generation (RAG) enabled chat for data</li>
          </ul>
        </Card>
        <Card className="bg-zinc-900 border border-gray-200 border-opacity-30">
          <h3 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-700 to-violet-400 text-2xl lg:text-3xl lg:m-1 text-center font-semibold">
            premium
          </h3>
          <h4 className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-700 to-violet-400 text-lg lg:text-xl text-center mb-2 font-semibold">
            coming soon
          </h4>
          <p className="text-gray-300 text-center text-lg lg:text-xl font-medium mb-4 max-w-md">
            Everything in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-tr from-pink-500 to-violet-300 font-bold">
              pro
            </span>
            , plus:
          </p>
          <ul className="list-disc list-inside text-gray-300 text-md lg:text-lg font-medium max-w-md lg:max-w-lg xl:max-w-xl min-w-full font-mono space-y-2 mt-4">
            <li>Unlimited projects</li>
            <li>Unlimited storage</li>
            <li>GPT-4-Turbo inference</li>
            <li>Access to all future models</li>
            <li>Collaborate with up to 20 people</li>
            <li>Single Sign-On (SSO)</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
