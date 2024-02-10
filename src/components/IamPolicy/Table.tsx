import { Provider, actionsByNamespace } from '@site/src/utils/iamPolicyUtils';

export default function IamPolicyTable({
  provider,
}: {
  provider: Provider;
}): JSX.Element {
  const groupedActions = actionsByNamespace(provider);

  return (
    <table>
      <thead>
        <tr>
          <th>Namespace</th>
          <th>Service</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(groupedActions).map((namespace, idx) => (
          <tr key={idx}>
            <td>
              <code>{namespace}</code>
            </td>
            <td>
              {groupedActions[namespace]?.length ? (
                <ul>
                  {groupedActions[namespace].map((action, idx) => (
                    <li key={`${namespace}-${idx}`}>
                      <code>{action}</code>
                    </li>
                  ))}
                </ul>
              ) : null}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
