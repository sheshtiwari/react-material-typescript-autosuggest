export class Thing {
  public type: string;
  public name: string;
  public description: string;
  public additionalType: string;
  public alternateName: string;
  public url: string;
  public image: string;
  public sameAs: string;
  constructor({
    type = 'thing',
    name,
    description,
    additionalType,
    alternateName,
    url,
    image,
    sameAs
  }: {
    type?: string;
    name?: string;
    description?: string;
    additionalType?: string;
    alternateName?: string;
    url?: string;
    image?: string;
    sameAs?: string;
  }) {
    this.type = type || '';
    this.name = name || '';
    this.description = description || '';
    this.additionalType = additionalType || '';
    this.alternateName = alternateName || '';
    this.url = url || '';
    this.image = image || '';
    this.sameAs = sameAs || '';
  }
}
