import axios from "axios";

import { expect, jest } from "@jest/globals";
import { getCharactersWithMultipleActors } from "./index";

jest.mock("axios");

describe("characters with multiple actors", () => {
  const mockGet = jest.fn();
  axios.get = mockGet;

  beforeEach(() => {
    mockGet.mockReset();
  });

  it("should get characters with multiple actors", async () => {
    mockGet.mockReturnValue(
      Promise.resolve({
        data: {
          cast: [
            {
              known_for_department: "Acting",
              name: "amigo",
              character: "Lion",
            },
            {
              known_for_department: "Acting",
              name: "dani",
              character: "Lion",
            },
          ],
        },
      })
    );
    const res = await getCharactersWithMultipleActors([
      { id: 1, original_title: "toto" },
    ]);
    expect(res).toMatchObject({
      toto: {
        Lion: ["amigo", "dani"],
      },
    });
  });
  it("should return empty object if there are no such charcters who were played with more than one actor", async () => {
    mockGet.mockReturnValue(
      Promise.resolve({
        data: {
          cast: [
            {
              known_for_department: "Acting",
              name: "amigo",
              character: "Lion",
            },
            {
              known_for_department: "Acting",
              name: "dani",
              character: "Zebra",
            },
          ],
        },
      })
    );
    const res = await getCharactersWithMultipleActors([
      { id: 1, original_title: "toto" },
    ]);
    expect(res).toStrictEqual({});
  });

  it("should return empty array if there are no movies", async () => {
    const res = await getCharactersWithMultipleActors([]);
    expect(res).toStrictEqual([]);
  });

  it("should return empty object if there are no credits found", async () => {
    mockGet.mockReturnValue(
      Promise.resolve({
        data: {
          cast: [],
        },
      })
    );
    const res = await getCharactersWithMultipleActors([
      { id: 1, original_title: "toto" },
      { id: 2, original_title: "loto" },
    ]);
    expect(res).toStrictEqual({});
  });
});
