import axios from "axios";
import { getActorsWithMultipleCharacters } from "./index.js";
import { expect, jest } from "@jest/globals";

jest.mock("axios");

describe("actors with multiple characters", () => {
  const mockGet = jest.fn();
  axios.get = mockGet;

  beforeEach(() => {
    mockGet.mockReset();
  });

  it("should get actors with multiple characters", async () => {
    mockGet.mockReturnValue(
      Promise.resolve({
        data: {
          cast: [
            {
              known_for_department: "Acting",
              name: "amigo",
              character: "Lion",
            },
          ],
        },
      })
    );
    const res = await getActorsWithMultipleCharacters([
      { id: 1, original_title: "toto" },
      { id: 2, original_title: "loto" },
    ]);
    expect(res).toMatchObject({
      amigo: [
        { movieName: "toto", character: "Lion" },
        { movieName: "loto", character: "Lion" },
      ],
    });
  });
  it("should return empty array if there are no movies found", async () => {
    const res = await getActorsWithMultipleCharacters([]);
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
    const res = await getActorsWithMultipleCharacters([
      { id: 1, original_title: "toto" },
      { id: 2, original_title: "loto" },
    ]);
    expect(res).toStrictEqual({});
  });
});
