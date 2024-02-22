"use client";
import { getCurrentUser, getCurrentUserTier } from "@/actions";
import Button from "@/components/Button";
import { tiers } from "@/constants";
import { Tier } from "@/types";
import { calculatePercentDelta } from "@/utils";
import { RadioGroup, Switch } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsBagCheck, BsCheckCircleFill, BsCircle } from "react-icons/bs";

export default function Upgrade() {
  const supabase = createClientComponentClient();
  const [plan, setPlan] = useState<Tier["name"] | null>(null);
  const [billingFrequency, setBillingFrequency] = useState<
    "monthly" | "yearly"
  >("yearly");

  useEffect(() => {
    const getTier = async () => {
      const tier = await getCurrentUserTier();
      setPlan(tier);
    };
    getTier();
  }, []);

  const handleUpgrade = async (tier: Tier["name"] | null) => {
    const user = await getCurrentUser();
    if (!tier) {
      return;
    }

    console.log(
      "Upgrading to",
      tier,
      "for user",
      user?.id,
      "with billing frequency",
      billingFrequency
    );

    // TODO: Process payment here

    // Update user tier in database
    const { error } = await supabase
      .from("users")
      .update({ tier })
      .eq("user_id", user?.id);
    if (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-start justify-start w-full space-y-4">
      <h3 className="font-bold text-4xl lg:text-5xl text-purple-200 pb-2">
        upgrade
      </h3>
      <p className="text-lg text-white leading-relaxed">
        Upgrade your account to unlock more features! For more details on each
        tier, check out our{" "}
        <Link href="/pricing" className="text-purple-200 hover:underline">
          pricing page.
        </Link>
      </p>
      <p className="text-sm lg:text-md text-gray-300 leading-relaxed">
        Subscriptions can be canceled at any time. If you cancel, you will still
        have access to the features of your current plan until the end of the
        billing period.
      </p>

      <Switch.Group as="div" className="flex flex-row items-center space-x-2">
        <p className="text-white">Billed</p>
        <Switch.Label className="text-purple-100 font-semibold">
          yearly
        </Switch.Label>
        <Switch
          checked={billingFrequency === "monthly"}
          onChange={(checked) =>
            setBillingFrequency(checked ? "monthly" : "yearly")
          }
          className={`${
            billingFrequency === "monthly"
              ? "bg-purple-400 bg-opacity-70"
              : "bg-zinc-700"
          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors ease-in-out duration-300`}
        >
          <span
            className={`${
              billingFrequency === "monthly" ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 transform bg-white rounded-full transition-transform ease-in-out duration-300`}
          />
        </Switch>
        <Switch.Label className="text-purple-100 font-semibold">
          monthly
        </Switch.Label>
      </Switch.Group>

      <RadioGroup
        className="flex flex-col items-center justify-center w-full text-start self-center"
        value={plan}
        onChange={setPlan}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 gap-2 w-full">
          {tiers.map((tier, index) => (
            <RadioGroup.Option
              key={index}
              value={tier.name}
              className="flex flex-col text-white text-md lg:text-lg bg-zinc-900 hover:bg-purple-400 hover:bg-opacity-30 w-full rounded-md cursor-pointer transition-colors ease-in-out duration-300"
            >
              {({ checked }) => (
                <div
                  className={`flex flex-row justify-between items-center w-full h-full space-x-4 ${
                    checked
                      ? "ring-inset ring-2 ring-purple-200 ring-opacity-60"
                      : ""
                  } rounded-md p-4`}
                >
                  <div className="flex flex-col w-full space-y-1">
                    <RadioGroup.Label
                      as="div"
                      className="flex flex-row items-center space-x-2"
                    >
                      <p className="text-xl lg:text-2xl">{tier.name}</p>
                      <span className="text-purple-300 text-lg lg:text-xl font-bold">
                        <div className="flex flex-row items-center space-x-1">
                          {billingFrequency === "yearly" &&
                            tier.name !== "individual" && (
                              <span className="line-through text-gray-400">
                                ${tier.monthlyPrice * 12}
                              </span>
                            )}
                          <span className="text-md">
                            $
                            {
                              tier[
                                billingFrequency === "monthly"
                                  ? "monthlyPrice"
                                  : "yearlyPrice"
                              ]
                            }
                          </span>
                          {billingFrequency === "yearly" &&
                            tier.name !== "individual" && (
                              <span className="ring-inset ring-1 ring-purple-950 px-2 py-1 rounded-full text-purple-900 text-sm font-semibold bg-purple-200">
                                {calculatePercentDelta(
                                  tier.monthlyPrice * 12,
                                  tier.yearlyPrice
                                )}
                                %
                              </span>
                            )}
                        </div>
                      </span>
                    </RadioGroup.Label>
                    <RadioGroup.Description className="text-gray-300 text-sm lg:text-md">
                      {tier.description}
                    </RadioGroup.Description>
                    <div className="w-full border-t border-gray-300 border-opacity-40" />
                    <RadioGroup.Description className="text-white font-bold text-sm lg:text-md">
                      best for:{" "}
                      <span className="text-purple-200 font-light">
                        {tier.bestFor}
                      </span>
                    </RadioGroup.Description>
                  </div>
                  <RadioGroup.Description
                    as="p"
                    className="text-purple-200 text-lg lg:text-xl"
                  >
                    {checked ? <BsCheckCircleFill /> : <BsCircle />}
                  </RadioGroup.Description>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      <Button className="self-center" onClick={() => handleUpgrade(plan)}>
        <BsBagCheck className="inline-block mr-2" />
        Upgrade
      </Button>
    </div>
  );
}
