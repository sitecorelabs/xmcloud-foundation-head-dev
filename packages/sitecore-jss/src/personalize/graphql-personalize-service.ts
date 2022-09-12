import { GraphQLClient, GraphQLRequestClient } from '../graphql-request-client';
import debug from '../debug';
import { isTimeoutError } from '../utils';

export type GraphQLPersonalizeServiceConfig = {
  /**
   * Your Graphql endpoint
   */
  endpoint: string;
  /**
   * The JSS application name
   */
  siteName: string;
  /**
   * The API key to use for authentication
   */
  apiKey: string;
  /**
   * Timeout (ms) for the Personalize request. Default is 250.
   */
  timeout?: number;
  /**
   * Override fetch method. Uses 'GraphQLRequestClient' default otherwise.
   */
  fetch?: typeof fetch;
};

/**
 * Object model of personlize info
 */
export type PersonalizeInfo = {
  /**
   * The (CDP-friendly) content id
   */
  contentId: string;
  /**
   * The configured variant ids
   */
  variantIds: string[];
};

type PersonalizeQueryResult = {
  layout: { item: { id: string; version: string; personalization: { variantIds: string[] } } };
};

export class GraphQLPersonalizeService {
  private graphQLClient: GraphQLClient;
  protected get query(): string {
    return /* GraphQL */ `
      query($siteName: String!, $language: String!, $itemPath: String!) {
        layout(site: $siteName, routePath: $itemPath, language: $language) {
          item {
            id
            version
            personalization {
              variantIds
            }
          }
        }
      }
    `;
  }
  /**
   * Fetch personalize data using the Sitecore GraphQL endpoint.
   * @param {GraphQLPersonalizeServiceConfig} config
   */
  constructor(protected config: GraphQLPersonalizeServiceConfig) {
    this.config.timeout = config.timeout || 250;
    this.graphQLClient = this.getGraphQLClient();
  }

  /**
   * Get personalize information for a route
   * @param {string} itemPath page route
   * @param {string} language language
   * @returns {Promise<PersonalizeInfo | undefined>} the personalize information or undefined (if itemPath / language not found)
   */
  async getPersonalizeInfo(
    itemPath: string,
    language: string
  ): Promise<PersonalizeInfo | undefined> {
    debug.personalize(
      'fetching personalize info for %s %s %s',
      this.config.siteName,
      itemPath,
      language
    );

    try {
      const data = await this.graphQLClient.request<PersonalizeQueryResult>(this.query, {
        siteName: this.config.siteName,
        itemPath,
        language,
      });

      return data?.layout?.item
        ? {
            // CDP expects content id format `embedded_<id>_<lang>` (lowercase)
            contentId: this.getContentId(data.layout.item.id, language),
            variantIds: data.layout.item.personalization.variantIds,
          }
        : undefined;
    } catch (error) {
      if (isTimeoutError(error)) {
        return undefined;
      }

      throw error;
    }
  }

  /**
   * Gets the content id for the CDP in the required format `embedded_<id>_<lang>`
   * @param {string} pageId the page id
   * @param {string} language the language
   * @returns {string} the content id
   */
  protected getContentId(pageId: string, language: string): string {
    return `embedded_${pageId}_${language.replace('-', '_')}`.toLowerCase();
  }

  /**
   * Gets a GraphQL client that can make requests to the API. Uses graphql-request as the default
   * library for fetching graphql data (@see GraphQLRequestClient). Override this method if you
   * want to use something else.
   * @returns {GraphQLClient} implementation
   */
  protected getGraphQLClient(): GraphQLClient {
    return new GraphQLRequestClient(this.config.endpoint, {
      apiKey: this.config.apiKey,
      debugger: debug.personalize,
      fetch: this.config.fetch,
      timeout: this.config.timeout,
    });
  }
}
