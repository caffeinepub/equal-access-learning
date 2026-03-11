// Stub backend — this app has no canister backend
// biome-ignore lint/suspicious/noExplicitAny: stub types
export type backendInterface = any;
// biome-ignore lint/suspicious/noExplicitAny: stub types
export type CreateActorOptions = any;

export class ExternalBlob {
  static fromURL(_url: string): ExternalBlob {
    return new ExternalBlob();
  }
  async getBytes(): Promise<Uint8Array> {
    return new Uint8Array();
  }
  onProgress?: (progress: number) => void;
}

export function createActor(
  _canisterId: string,
  _upload: (file: ExternalBlob) => Promise<Uint8Array>,
  _download: (bytes: Uint8Array) => Promise<ExternalBlob>,
  _options?: CreateActorOptions,
// biome-ignore lint/suspicious/noExplicitAny: stub return
): any {
  return {} as backendInterface;
}
