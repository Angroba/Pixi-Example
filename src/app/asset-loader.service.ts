import { Resource, Texture } from 'pixi.js';
import * as PIXI from "pixi.js";
import hero from '../assets/img/hero.png'


 // window['PIXI'] = PIXI;
// require("pixi-spine");

const developerAssets: Record<DevTextureName, string> = {
  //! SPRITES
hero,
};

interface Textures {
  [assetName: string]: string;
}

export enum DevTextureName {
  HERO = "hero",
}

// const spines: SpineMeta[] = [
//
//   {
//     texture: DevTextureName.POINTER,
//     jsonModule: import("../../../../../Work/GaG-version1/src/game/assets/spine/GaG/pointer/pointer.json"),
//     atlasModule: import(
//       // @ts-ignore
//       "!raw-loader!../../../../../Work/GaG-version1/src/game/assets/spine/GaG/pointer/pointer.atlas"
//     )
//   },
//   //
//   {
//     texture: DevTextureName.BUTTONS,
//     jsonModule: import("../../../../../Work/GaG-version1/src/game/assets/spine/GaG/buttons/buttons.json"),
//     atlasModule: import(
//       // @ts-ignore
//       "!raw-loader!../../../../../Work/GaG-version1/src/game/assets/spine/GaG/buttons/buttons.atlas"
//     )
//   },
//   {
//     texture: DevTextureName.GREEN_GOBLIN,
//     jsonModule: import("../../../../../Work/GaG-version1/src/game/assets/spine/GaG/green_goblin/goblin_green.json"),
//     atlasModule: import(
//       // @ts-ignore
//       "!raw-loader!../../../../../Work/GaG-version1/src/game/assets/spine/GaG/green_goblin/goblin_green.atlas"
//     )
//   },
//   {
//     texture: DevTextureName.RED_GOBLIN,
//     jsonModule: import("../../../../../Work/GaG-version1/src/game/assets/spine/GaG/red_goblin/goblin_red.json"),
//     atlasModule: import(
//       // @ts-ignore
//       "!raw-loader!../../../../../Work/GaG-version1/src/game/assets/spine/GaG/red_goblin/goblin_red.atlas"
//     )
//   },
//   {
//     texture: DevTextureName.GOLD,
//     jsonModule: import("../../../../../Work/GaG-version1/src/game/assets/spine/GaG/gold/gold.json"),
//     atlasModule: import(
//       // @ts-ignore
//       "!raw-loader!../../../../../Work/GaG-version1/src/game/assets/spine/GaG/gold/gold.atlas"
//     )
//   },
//   {
//     texture: DevTextureName.SMOKE,
//     jsonModule: import("../../../../../Work/GaG-version1/src/game/assets/spine/GaG/smoke/smoke.json"),
//     atlasModule: import(
//       // @ts-ignore
//       "!raw-loader!../../../../../Work/GaG-version1/src/game/assets/spine/GaG/smoke/smoke.atlas"
//     )
//   },
//   {
//     texture: DevTextureName.CHEST,
//     jsonModule: import("../../../../../Work/GaG-version1/src/game/assets/spine/GaG/chest/chest.json"),
//     atlasModule: import(
//       // @ts-ignore
//       "!raw-loader!../../../../../Work/GaG-version1/src/game/assets/spine/GaG/chest/chest.atlas"
//     )
//   },
//   {
//     texture: DevTextureName.CARD,
//     jsonModule: import("../../../../../Work/GaG-version1/src/game/assets/spine/GaG/card/card.json"),
//     atlasModule: import(
//       // @ts-ignore
//       "!raw-loader!../../../../../Work/GaG-version1/src/game/assets/spine/GaG/card/card.atlas"
//     )
//   },
//   {
//     texture: DevTextureName.BUTTONS2,
//     jsonModule: import("../../../../../Work/GaG-version1/src/game/assets/spine/GaG/buttons1/buttons1.json"),
//     atlasModule: import(
//       // @ts-ignore
//       "!raw-loader!../../../../../Work/GaG-version1/src/game/assets/spine/GaG/buttons1/buttons1.atlas"
//     )
//   },
// ];
//
export class AssetLoaderService {
  async loadDeveloperAssets() {
    await this.loadPixiAssets(developerAssets);
  }

  async loadConfigurableAssets(assets: Textures) {
    await this.loadPixiAssets(assets);
  }
  //
  // async loadSpines() {
  //   await Promise.all(spines.map((spineMeta) => this.loadSpine(spineMeta)));
  // }

  /**
   * Promisified version of PIXI Loader.
   * Loads all required assets.
   *
   * @param textures map of textures to their paths
   */
  private loadPixiAssets = (textures: Textures) => {
    return new Promise((resolve) => {
      Object.entries(textures).forEach(([key, path]) => {
        const isExisting = !!PIXI.Loader.shared.resources[key];
        if (!isExisting) {
          PIXI.Loader.shared.add(key, path);
        }
      });
      PIXI.Loader.shared.load(resolve);
    });
  };

  /**
   * Use this method to load texture provided in the config.ts with AssetType.TEXTURE.
   * You can access your Asset by using a key provide in the configs.
   */
  // public loadAssetsFromConfigs = (configs: any) => {
  //   return new Promise((resolve) => {
  //     Object.entries(configs[AssetType.TEXTURE]).forEach(([key, path]) => {
  //       // We need to delete existing texture,
  //       // because technically different paths are stored under the same key on config change.
  //       delete PIXI.Loader.shared.resources[key];
  //       PIXI.Loader.shared.add(key, path);
  //     });
  //     PIXI.Loader.shared.load(resolve);
  //   });
  // };

  // private loadSpine = (meta: SpineMeta): Promise<void> => {
  //   return Promise.all([meta.atlasModule, meta.jsonModule]).then(
  //     ([moduleAtlas, moduleJson]) => {
  //       const rawAtlasData = moduleAtlas.default;
  //       const rawSkeletonData = moduleJson.default;
  //
  //       const spineAtlas = new window.PIXI.spine.core.TextureAtlas(
  //         rawAtlasData,
  //         (line, callback) => {
  //           const baseTexture =
  //           callback(baseTexture);
  //         }
  //       );
  //
  //       const spineAtlasLoader = new window.PIXI.spine.core.AtlasAttachmentLoader(
  //         spineAtlas
  //       );
  //       const spineJsonParser = new window.PIXI.spine.core.SkeletonJson(
  //         spineAtlasLoader
  //       );
  //
  //       PIXI.Loader.shared.resources[
  //         meta.texture
  //       ].spineData = spineJsonParser.readSkeletonData(rawSkeletonData);
  //     }
  //   );
  // };
}
//
// interface SpineMeta {
//   atlasModule: Promise<any>;
//   jsonModule: Promise<any>;
//   texture: DevTextureName;
// }
