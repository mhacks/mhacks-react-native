export function userHasAnyOfGroups(user, ...groups) {
    for (group of groups) {
        if (user.groups.includes(group)) {
            return true;
        }
    }
    return false;
}