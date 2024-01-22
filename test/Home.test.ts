import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Home from "../pages/index.vue";

describe("Test home page", () => {
  it("is a Vue instance", () => {
    const wrapper = mount(Home);
    expect(wrapper.vm).toBeTruthy();
  });

  it("renders the correct content", () => {
    const wrapper = mount(Home);
    expect(wrapper.text()).toContain("Travels and Bookings management system");
  });

  it("has the correct class names", () => {
    const wrapper = mount(Home);
    const divElement = wrapper.find("div");
    expect(divElement.classes()).toEqual([
      "flex",
      "justify-center",
      "items-center",
      "text-2xl",
    ]);
  });

  // Add more test cases as needed
});
