import useStoredJson from '@theme/useStoredJson';
import { sortedUniq } from 'lodash';

export type Provider = 'aws' | 'gcp';

const awsPolicyNames = ['ResotoOrgList', 'ResotoCollect'] as const;
export type AwsPolicyName = (typeof awsPolicyNames)[number];
export interface AwsPolicy {
  Version: string;
  Statement: { Effect: string; Resource: string; Action: string[] }[];
}

const gcpPolicyNames = ['resoto_access'] as const;
export type GcpPolicyName = (typeof gcpPolicyNames)[number];
export interface GcpPolicy {
  title: string;
  description: string;
  stage: string;
  includedPermissions: string[];
}

export const actionsByNamespace = (
  provider: Provider,
): { [namespace: string]: string[] } => {
  const permissions =
    provider === 'aws'
      ? sortedUniq(
          awsPolicyNames
            .reduce<
              string[]
            >((acc, policyName) => [...acc, ...((useStoredJson(`aws-${policyName}`) as AwsPolicy)?.Statement[0].Action ?? [])], [])
            .sort(),
        ).map((action) => {
          const [namespace, name] = action.split(':');

          return {
            namespace,
            name,
          };
        })
      : provider === 'gcp'
        ? sortedUniq(
            gcpPolicyNames
              .reduce<
                string[]
              >((acc, policyName) => [...acc, ...((useStoredJson(`gcp-${policyName}`) as GcpPolicy)?.includedPermissions ?? [])], [])
              .sort(),
          ).map((action) => {
            const split = action.split('.');

            return {
              namespace: split.shift(),
              name: split.join('.'),
            };
          })
        : [];

  return permissions.reduce(
    (acc, action) => ({
      ...acc,
      [action.namespace]: [...(acc[action.namespace] || []), action.name],
    }),
    {},
  );
};
