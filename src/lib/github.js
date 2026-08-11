// GitHub REST API helper with in-memory caching and graceful fallback
const repoCache = new Map();
const userCache = new Map();

/**
 * Fetch repository metrics (stars, forks, open issues, updated_at, topics)
 * @param {string} repoFullName - e.g. "VP171097/contact-lens-voice-analytics-pipeline"
 */
export async function fetchGitHubRepo(repoFullName) {
  if (!repoFullName) return null;

  if (repoCache.has(repoFullName)) {
    return repoCache.get(repoFullName);
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${repoFullName}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!res.ok) {
      // Return null or cached empty info on rate limit/404
      return null;
    }

    const data = await res.json();
    const result = {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      openIssues: data.open_issues_count ?? 0,
      language: data.language || "Python",
      topics: data.topics || [],
      pushedAt: data.pushed_at ? new Date(data.pushed_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : null,
      description: data.description,
      htmlUrl: data.html_url,
    };

    repoCache.set(repoFullName, result);
    return result;
  } catch (err) {
    console.warn(`GitHub API request failed for ${repoFullName}:`, err);
    return null;
  }
}

/**
 * Fetch GitHub user profile stats
 * @param {string} username - e.g. "VP171097"
 */
export async function fetchGitHubUser(username = "VP171097") {
  if (userCache.has(username)) {
    return userCache.get(username);
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!res.ok) return null;

    const data = await res.json();
    const result = {
      publicRepos: data.public_repos ?? 0,
      followers: data.followers ?? 0,
      following: data.following ?? 0,
      publicGists: data.public_gists ?? 0,
      avatarUrl: data.avatar_url,
      bio: data.bio,
      createdAt: data.created_at ? new Date(data.created_at).getFullYear() : 2020,
    };

    userCache.set(username, result);
    return result;
  } catch (err) {
    console.warn(`GitHub user API failed for ${username}:`, err);
    return null;
  }
}
